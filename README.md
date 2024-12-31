
# Ubicaciones de Costa Rica

Este proyecto es una aplicación web desarrollada con [Next.js](https://nextjs.org/) que proporciona información sobre las provincias, cantones y distritos de Costa Rica, así como sus códigos postales. También ofrece un API en formato JSON para que desarrolladores puedan integrar esta información en sus aplicaciones.

## 🚀 Características

- Visualización interactiva de provincias, cantones y distritos.
- Generación de códigos postales según la selección.
- API en formato JSON que permite obtener información estructurada.
- Estilos limpios y consistentes con soporte para dispositivos móviles.
- Uso de datos dinámicos y componentes reutilizables.

---

## 📦 Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/lfbvyo/ubicaciones.git
   cd ubicaciones
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o
   yarn install
   ```

---

## 🛠 Uso en Desarrollo

1. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

2. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

---

## 🌐 API Endpoints

### 1. Provincias
Devuelve una lista de todas las provincias.

**URL:**  
`GET /provincias.json`

**Ejemplo de respuesta:**
```json
{
  "1": "San José",
  "2": "Alajuela",
  "3": "Cartago",
  "4": "Heredia",
  "5": "Guanacaste",
  "6": "Puntarenas",
  "7": "Limón"
}
```

### 2. Cantones
Devuelve una lista de cantones según la provincia.

**URL:**  
`GET /provincia/:provinciaId/cantones.json`

**Ejemplo de respuesta para `provinciaId=1`:**
```json
{
  "1": "Central",
  "2": "Escazú",
  "3": "Desamparados"
}
```

### 3. Distritos
Devuelve una lista de distritos según la provincia y el cantón.

**URL:**  
`GET /provincia/:provinciaId/canton/:cantonId/distritos.json`

**Ejemplo de respuesta para `provinciaId=1` y `cantonId=1`:**
```json
{
  "1": "Carmen",
  "2": "Merced",
  "3": "Hospital"
}
```

---

## 🌟 Cómo Usar el API

Visita la página ["Cómo usar el API"](http://localhost:3000/api-instructions) para más detalles sobre cómo interactuar con los endpoints.

---

## 🚀 Despliegue

Este proyecto puede ser desplegado fácilmente en [Vercel](https://vercel.com/) o [Cloudflare Pages](https://pages.cloudflare.com/).

### Despliegue en Vercel
1. Conecta tu repositorio a [Vercel](https://vercel.com/).
2. Realiza el despliegue directamente desde su interfaz.

---

## 🖼 Recursos Visuales

Incluye imágenes y datos proporcionados por [Pixabay](https://pixabay.com/) bajo una licencia libre de uso.

---

## 📂 Estructura del Proyecto

```plaintext
src/
├── app/               # Estructura principal de Next.js
├── components/        # Componentes reutilizables
├── pages/             # Páginas estáticas y dinámicas
├── public/            # Archivos estáticos (JSON, imágenes)
└── styles/            # Archivos de estilos (CSS/Tailwind)
```

---

## 🛡 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

## 🤝 Contribuciones

¡Contribuciones, reportes de bugs y sugerencias son bienvenidos! Puedes:

- **Crear un Pull Request:** Si tienes una mejora o funcionalidad que agregar.
- **Abrir un Issue:** Si encuentras un bug o tienes una sugerencia.

Por favor, consulta las [reglas de contribución](https://github.com/lfbvyo/ubicaciones/blob/main/CONTRIBUTING.md) para más detalles.

---

## 🙌 Agradecimientos

- [Pixabay](https://pixabay.com/) por las imágenes.
- Inspiración de [Next.js](https://nextjs.org/) y la comunidad de código abierto.

