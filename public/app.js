// Dark Brand Twin explorer: cascading provincia -> canton -> distritos/CP,
// searchable at the current level, plus interactive CR map (tooltip, click selects).
(function () {
  "use strict";

  var tbody = document.getElementById("explorer-body");
  if (!tbody) return; // not the home page

  var cantonGrid = document.getElementById("canton-grid");
  var distPane = document.getElementById("dist-pane");
  var crumb = document.getElementById("crumb");
  var searchEl = document.getElementById("search");
  var backBtn = document.getElementById("back-cantones");

  var provName = null;
  var activeCanton = null; // {id, name}
  var cantonesCache = {}; // provId -> {id: name}
  var distCache = {}; // "p-c" -> rows [{d, dname, cp}]

  function getJSON(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error(r.status + " " + url);
      return r.json();
    });
  }

  function cpCode(provId, cantonId, distId) {
    return String(provId) + String(cantonId).padStart(2, "0") + String(distId).padStart(2, "0");
  }

  function esc(s) {
    return String(s).replace(/[<>&"]/g, function (c) {
      return { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c];
    });
  }

  function query() {
    return searchEl ? searchEl.value.trim().toLowerCase() : "";
  }

  function setPlaceholder() {
    if (!searchEl) return;
    searchEl.placeholder = activeCanton
      ? "Filtrar distritos de " + activeCanton.name + "…"
      : "Filtrar cantones de " + (provName || "") + "…";
  }

  function setCrumb(cantonName) {
    if (!crumb) return;
    var h = '<span class="c-prov">' + esc(provName) + "</span>";
    if (cantonName) {
      h += '<span class="c-sep">›</span><span class="c-cur">' + esc(cantonName) + "</span>";
    } else {
      h += '<span class="c-sep">›</span><span class="c-hint">elegí un cantón</span>';
    }
    crumb.innerHTML = h;
  }

  // ---- Level 2: canton chips ----
  function renderCantones() {
    var q = query();
    var all = cantonesCache[activeProvId()] || {};
    var ids = Object.keys(all).sort(function (a, b) { return Number(a) - Number(b); });
    cantonGrid.innerHTML = "";
    var shown = 0;
    ids.forEach(function (cid) {
      var name = all[cid];
      if (q && name.toLowerCase().indexOf(q) === -1 && cid.indexOf(q) === -1) return;
      shown++;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "canton-chip";
      b.setAttribute("data-id", cid);
      b.textContent = String(cid).padStart(2, "0") + " · " + name;
      cantonGrid.appendChild(b);
    });
    if (!shown) {
      cantonGrid.innerHTML = '<span class="empty" style="color:var(--muted);font-size:14px">Sin resultados para “' + esc(q) + '”.</span>';
    }
  }

  function showCantones() {
    activeCanton = null;
    distPane.hidden = true;
    cantonGrid.hidden = false;
    setCrumb(null);
    setPlaceholder();
    renderCantones();
  }

  // ---- Level 3: distritos table ----
  function loadDistritos(pid, cid) {
    var key = pid + "-" + cid;
    if (distCache[key]) return Promise.resolve(distCache[key]);
    return getJSON("/provincia/" + pid + "/canton/" + cid + "/distritos.json").then(function (distritos) {
      var rows = Object.keys(distritos).map(function (did) {
        return {
          d: Number(did),
          dname: distritos[did],
          cp: cpCode(pid, cid, did)
        };
      });
      rows.sort(function (a, b) { return a.d - b.d; });
      distCache[key] = rows;
      return rows;
    });
  }

  function renderDistritos(rows) {
    var q = query();
    var filtered = !q
      ? rows
      : rows.filter(function (r) {
          return r.dname.toLowerCase().indexOf(q) !== -1 || r.cp.indexOf(q) !== -1;
        });
    tbody.innerHTML = "";
    if (!filtered.length) {
      tbody.innerHTML = '<tr><td colspan="2" class="empty">Sin resultados para “' + esc(q) + '”.</td></tr>';
      return;
    }
    var MAX = 40;
    var frag = document.createDocumentFragment();
    filtered.slice(0, MAX).forEach(function (r) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" + r.dname + '</td><td><code>' + r.cp + "</code></td>";
      frag.appendChild(tr);
    });
    if (filtered.length > MAX) {
      var more = document.createElement("tr");
      more.innerHTML = '<td colspan="2" class="empty">Mostrando ' + MAX + " de " + filtered.length + " — refin\u00E1 con el filtro.</td>";
      frag.appendChild(more);
    }
    tbody.appendChild(frag);
  }

  function selectCanton(cid) {
    var all = cantonesCache[activeProvId()] || {};
    var cname = all[cid] || cid;
    activeCanton = { id: cid, name: cname };
    setCrumb(cname);
    setPlaceholder();
    cantonGrid.hidden = true;
    distPane.hidden = false;
    tbody.innerHTML = '<tr><td colspan="2" class="empty">Cargando…</td></tr>';
    loadDistritos(activeProvId(), cid)
      .then(renderDistritos)
      .catch(function () {
        tbody.innerHTML = '<tr><td colspan="2" class="empty">Error cargando datos.</td></tr>';
      });
  }

  // ---- Level 1: provinces ----
  var currentProv = null;

  function activeProvId() {
    return currentProv;
  }

  function selectProvince(provId, opts) {
    opts = opts || {};
    provId = String(provId);
    currentProv = provId;
    var pills = document.querySelectorAll(".pill[data-id]");
    for (var i = 0; i < pills.length; i++) {
      pills[i].classList.toggle("active", pills[i].getAttribute("data-id") === provId);
    }
    provName = null;
    var pb = document.querySelector('.pill[data-id="' + provId + '"]');
    if (pb) provName = pb.textContent.trim();
    tbody.innerHTML = "";
    distPane.hidden = true;
    cantonGrid.hidden = false;
    cantonGrid.innerHTML = '<span class="empty" style="color:var(--muted);font-size:14px">Cargando cantones…</span>';
    setCrumb(null);
    if (searchEl) searchEl.value = "";

    if (!cantonesCache[provId]) {
      cantonesCache[provId] = {}; // guard against double-fetch races
      getJSON("/provincia/" + provId + "/cantones.json")
        .then(function (c) {
          cantonesCache[provId] = c;
          if (currentProv === provId) showCantones();
        })
        .catch(function () {
          if (currentProv === provId) {
            cantonGrid.innerHTML = '<span class="empty" style="color:var(--muted);font-size:14px">Error cargando datos.</span>';
          }
        });
    } else {
      showCantones();
    }

    if (opts.scroll) {
      var ex = document.getElementById("explorer");
      if (ex) ex.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Events: province pills
  var pillBox = document.querySelector(".explorer .side");
  if (pillBox) {
    pillBox.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest(".pill[data-id]") : null;
      if (btn && btn.getAttribute("data-id") !== currentProv) selectProvince(btn.getAttribute("data-id"));
    });
  }

  // Canton chips + back
  cantonGrid.addEventListener("click", function (e) {
    var chip = e.target.closest ? e.target.closest(".canton-chip") : null;
    if (chip) selectCanton(chip.getAttribute("data-id"));
  });
  if (backBtn) backBtn.addEventListener("click", showCantones);

  // Search filters the current level only
  var form = document.getElementById("search-form");
  if (form) form.addEventListener("submit", function (e) { e.preventDefault(); });
  if (searchEl) {
    searchEl.addEventListener("input", function () {
      if (activeCanton) {
        loadDistritos(currentProv, activeCanton.id).then(renderDistritos).catch(function () {});
      } else {
        renderCantones();
      }
    });
  }

  // Map: hover tooltip + click-to-explore
  var tip = document.getElementById("mapTip");
  if (tip) {
    var map = document.querySelector(".cr-map");
    if (map) {
      map.addEventListener("mouseover", function (e) {
        var p = e.target.closest ? e.target.closest(".prov") : null;
        if (!p) return;
        tip.textContent = "";
        var name = document.createTextNode(p.getAttribute("data-name"));
        var idSpan = document.createElement("span");
        idSpan.textContent = "id " + p.getAttribute("data-id");
        tip.appendChild(name);
        tip.appendChild(idSpan);
        tip.classList.add("show");
      });
      map.addEventListener("mouseleave", function () { tip.classList.remove("show"); });
      map.addEventListener("click", function (e) {
        var p = e.target.closest ? e.target.closest(".prov") : null;
        if (p && p.getAttribute("data-id") !== currentProv) selectProvince(p.getAttribute("data-id"), { scroll: true });
      });
    }
  }

  // Boot: default San José
  selectProvince(1);
})();
