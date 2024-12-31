"use client";
import SVGLogo from "../SVGLogo";
import LinkIcon from "../LinkIcon";

export default function APIInstructions() {
  return (
    <div className="px-4 min-h-screen sm:flex flex-col justify-start items-center font-ubuntu text-gray-600">
      {/* Header */}
      <div className="w-full flex justify-center items-center mb-4 p-2">
        <div className="flex items-center space-x-2">
          <div className="w-20 h-20 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow">
            <SVGLogo />
          </div>
          <h1 className="text-4xl font-bold font-nunito text-center">
            Cómo usar el API
          </h1>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap justify-center items-center w-full">
        <a className="pill" href="/">
          Ver ubicaciones y código postal <LinkIcon />
        </a>
        <a
          className="pill"
          href="https://github.com/lfbvyo/ubicaciones"
          target="_blank"
        >
          Ver repositorio <LinkIcon />
        </a>
      </div>

      {/* Description */}
      <p className="flex justify-center items-center sm:w-2/3 my-4 text-center">
        Esta API ofrece datos en formato JSON sobre las provincias, cantones y
        distritos de Costa Rica. Puedes usarla para integrar información de
        ubicaciones en tus aplicaciones. Aquí tienes las instrucciones para
        interactuar con los diferentes endpoints.
      </p>

      {/* Main Container */}
      <div className="flex p-4 justify-center items-center">
        <div className="w-full max-w-lg rounded px-4 space-y-10">
          {/* Endpoints */}
          <div>
            <h2 className="text-2xl font-bold text-gray-600 mb-4">
              Endpoints Disponibles
            </h2>

            {/* Provincias */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                1. Provincias
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Devuelve una lista de todas las provincias en formato JSON.
              </p>
              <code className="block bg-gray-100 text-sm text-gray-800 p-2 rounded">
                GET /provincias.json
              </code>
              <p className="text-xs text-gray-400 mt-1">
                Ejemplo de respuesta:
              </p>
              <pre className="bg-gray-100 text-xs text-gray-800 p-2 rounded">
                {`{
  "1": "San José",
  "2": "Alajuela",
  "3": "Cartago",
  "4": "Heredia",
  "5": "Guanacaste",
  "6": "Puntarenas",
  "7": "Limón"
}`}
              </pre>
            </div>

            {/* Cantones */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                2. Cantones
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Devuelve una lista de los cantones según la provincia
                seleccionada.
              </p>
              <code className="block bg-gray-100 text-sm text-gray-800 p-2 rounded">
                GET /provincia/:provinciaId/cantones.json
              </code>
              <p className="text-xs text-gray-400 mt-1">
                Ejemplo de respuesta para <code>provinciaId=1</code>:
              </p>
              <pre className="bg-gray-100 text-xs text-gray-800 p-2 rounded">
                {`{
  "1": "Central",
  "2": "Escazú",
  "3": "Desamparados",
  ...
}`}
              </pre>
            </div>

            {/* Distritos */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                3. Distritos
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Devuelve una lista de distritos según el cantón y la provincia
                seleccionada.
              </p>
              <code className="block bg-gray-100 text-sm text-gray-800 p-2 rounded overflow-x-auto">
                GET /provincia/:provinciaId/canton/:cantonId/distritos.json
              </code>
              <p className="text-xs text-gray-400 mt-1">
                Ejemplo de respuesta para <code>provinciaId=1</code> y{" "}
                <code>cantonId=1</code>:
              </p>
              <pre className="bg-gray-100 text-xs text-gray-800 p-2 rounded">
                {`{
  "1": "Carmen",
  "2": "Merced",
  "3": "Hospital",
  ...
}`}
              </pre>
            </div>
          </div>

          {/* Footer */}
          <div className="text-sm text-gray-500">
            <p>
              Para más información, consulta el{" "}
              <a
                href="https://github.com/lfbvyo/ubicaciones"
                target="_blank"
                className="text-pastel-yellow font-bold underline"
              >
                repositorio en GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
