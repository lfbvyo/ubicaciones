import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

const outputDirectory = "public";
const requiredFiles = [
  "index.html",
  "app.js",
  "como-usar-el-api/index.html",
  "favicon.svg",
  "llms.txt",
  "provincias.json",
  "robots.txt",
  "_headers",
];

await Promise.all(
  requiredFiles.map((file) => access(join(outputDirectory, file))),
);

const provinces = JSON.parse(
  await readFile(join(outputDirectory, "provincias.json"), "utf8"),
);

let cantonCount = 0;
let districtCount = 0;

for (const provinceId of Object.keys(provinces)) {
  const provinceDirectory = join(outputDirectory, "provincia", provinceId);
  const cantons = JSON.parse(
    await readFile(join(provinceDirectory, "cantones.json"), "utf8"),
  );

  cantonCount += Object.keys(cantons).length;

  for (const cantonId of Object.keys(cantons)) {
    const districts = JSON.parse(
      await readFile(
        join(provinceDirectory, "canton", cantonId, "distritos.json"),
        "utf8",
      ),
    );

    districtCount += Object.keys(districts).length;
  }
}

console.log(
  `Validated static site: ${Object.keys(provinces).length} provinces, ${cantonCount} cantons, ${districtCount} districts.`,
);
