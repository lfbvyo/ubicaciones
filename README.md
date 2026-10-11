# Ubicaciones de Costa Rica

Sitio estático y API JSON abierta con provincias, cantones, distritos y códigos postales de Costa Rica.

- Sitio: <https://ubicaciones.paginasweb.cr>
- Sin API key
- CORS abierto para consultas `GET`
- Licencia MIT

## API

```text
GET /provincias.json
GET /provincia/:provinciaId/cantones.json
GET /provincia/:provinciaId/canton/:cantonId/distritos.json
```

Ejemplo:

```js
const provincias = await fetch(
  "https://ubicaciones.paginasweb.cr/provincias.json",
).then((response) => response.json());
```

## Desarrollo

No requiere framework ni dependencias de runtime. Para validar los archivos:

```bash
npm ci
npm run build
```

Para verlo localmente, serví la carpeta `public/` con cualquier servidor HTTP estático.

## Estructura

```text
public/
├── index.html
├── app.js
├── como-usar-el-api/index.html
├── llms.txt
├── robots.txt
├── provincias.json
└── provincia/<id>/...
```

La aplicación anterior en Next.js se conserva en `legacy-next/` solo como referencia histórica; Cloudflare no la publica.

## Despliegue

Cloudflare Pages está conectado directamente a este repositorio:

- rama de producción: `main`
- comando de build: `npm run build`
- directorio de salida: `public`

Los previews y despliegues se crean desde la integración de GitHub de Cloudflare, por lo que el repositorio no necesita secretos ni tokens de Cloudflare.

## Contribuir

Los reportes y pull requests son bienvenidos. Consultá [CONTRIBUTING.md](CONTRIBUTING.md) antes de enviar cambios.

## Licencia

MIT. Consultá `LICENSE` para más detalles.
