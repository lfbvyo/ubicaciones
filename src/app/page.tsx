"use client";
import Image from "next/image";
// pages/index.js
// English comments only
import { useState, useEffect, useRef } from "react";
import SVGLogo from "./SVGLogo";
import LinkIcon from "./LinkIcon";
import { CustomButton } from "./Button/Button";

type Location = {
  id: number;
  name: string;
};

export default function Home() {
  const endOfPageRef = useRef<HTMLDivElement>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | number>();
  const [selectedCanton, setSelectedCanton] = useState<string | number>();
  const [selectedDistrito, setSelectedDistrito] = useState<string | number>();

  const [postalCode, setPostalCode] = useState<string>();

  const [provincesData, setProvincesData] = useState<Location[]>([]);
  const [cantonesData, setCantonesData] = useState<Location[]>([]);
  const [distritosData, setDistritosData] = useState<Location[]>([]);

  const handleProvinceClick = (provinceId: string | number) => {
    if (provinceId === selectedProvince) return;

    setSelectedProvince(provinceId);
    fetch(`/provincia/${provinceId}/cantones.json`)
      .then((response) => response.json())
      .then((data: any) =>
        setCantonesData(
          Object.entries(data).map(([id, name]) => ({
            id: Number(id),
            name,
          })) as Location[]
        )
      )
      .catch((error) => console.error(error));
    setSelectedCanton(undefined);
    setSelectedDistrito(undefined);
    setPostalCode(undefined);
  };

  const handleCantonClick = (cantonId: string | number) => {
    if (selectedCanton === cantonId) return;
    fetch(`/provincia/${selectedProvince}/canton/${cantonId}/distritos.json`)
      .then((response) => response.json())
      .then((data: any) =>
        setDistritosData(
          Object.entries(data).map(([id, name]) => ({
            id: Number(id),
            name,
          })) as Location[]
        )
      )
      .catch((error) => console.error(error));
    setSelectedCanton(cantonId);
    setPostalCode(undefined);
    setSelectedDistrito(undefined);
  };

  const handleDistritoClick = (distritoId: string | number) => {
    setSelectedDistrito(distritoId);
    setPostalCode(
      `El código postal es: ${selectedProvince}${selectedCanton
        ?.toString()
        .padStart(2, "0")}${distritoId?.toString().padStart(2, "0")}`
    );
  };

  useEffect(() => {
    fetch("/provincias.json")
      .then((response) => response.json())
      .then((data: any) =>
        setProvincesData(
          Object.entries(data).map(([id, name]) => ({
            id: Number(id),
            name,
          })) as Location[]
        )
      )
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedDistrito || selectedCanton || selectedProvince) {
      setTimeout(() => {
        endOfPageRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  }, [selectedDistrito, selectedCanton, selectedProvince]);

  return (
    <div className="px-4 min-h-screen flex flex-col justify-start items-center font-ubuntu text-gray-600 ">
      <div className="w-full flex justify-center items-center mb-4 p-2">
        <div className="flex items-center space-x-2">
          <div className="w-20 h-20 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow">
            <SVGLogo />
          </div>
          <h1 className="text-4xl font-bold font-nunito text-center">
            Ubicaciones de Costa Rica
          </h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center w-full">
        <a className="pill" href="/como-usar-el-api">
          Como usar el API? <LinkIcon />
        </a>
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
      <p className="flex justify-center items-center sm:w-2/3 my-4 text-center">
        Esta página contiene una lista de las provincias, cantones y distritos
        de Costa Rica y códigos postales. Además, ofrece una API en formato JSON
        que devuelve todas las provincias, los cantones según una provincia y
        los distritos según un cantón.
      </p>
      {/*  Main container */}
      <div className="sm:grid grid-cols-2 p-4 ">
        <div className="w-full max-w-sm rounded px-4 space-y-10">
          {/* Provinces */}
          <div>
            <h2 className="text-xl font-bold text-gray-600 mb-2">Provincias</h2>
            <div id="provincias-list" className="space-y-2">
              {provincesData?.length
                ? provincesData.map((prov) => (
                    <CustomButton
                      key={prov.id}
                      onClick={handleProvinceClick}
                      id={prov.id}
                      selected={prov.id === selectedProvince}
                    >
                      {prov.name}
                    </CustomButton>
                  ))
                : "Cargando provincias..."}
            </div>
          </div>

          {/* Cantones */}
          {selectedProvince && (
            <div id="cantones-section" className="transition duration-200">
              <h2 className="text-xl font-bold text-gray-600 mb-2">Cantones</h2>
              <div id="cantones-list" className="space-y-1">
                {cantonesData.map((ct) => (
                  <CustomButton
                    key={ct.id}
                    onClick={handleCantonClick}
                    id={ct.id}
                    selected={ct.id === selectedCanton}
                  >
                    {ct.name}
                  </CustomButton>
                ))}
              </div>
            </div>
          )}

          {/* Distritos */}
          {selectedCanton && (
            <div id="distritos-section" className="transition duration-200">
              <h2 className="text-xl font-bold text-gray-600 mb-2">
                Distritos
              </h2>
              <div id="distritos-list" className="space-y-1">
                {distritosData.map((dt) => (
                  <CustomButton
                    key={dt.id}
                    onClick={handleDistritoClick}
                    id={dt.id}
                    selected={dt.id === selectedDistrito}
                  >
                    {dt.name}
                  </CustomButton>
                ))}
              </div>
            </div>
          )}

          {/* Postal Code */}
          {postalCode && (
            <div id="postal-section" className="transition duration-200">
              <h2 className="text-xl font-bold text-gray-600 mb-2">
                Código Postal
              </h2>
              <div id="postal-code" className="text-[#4f2e37] font-semibold">
                {postalCode}
              </div>
            </div>
          )}
        </div>
        <div className=" hidden md:inline-block">
          <Image
            className="max-h-[75vh] rounded-lg border-2 border-pastel-yellow  sticky top-8"
            src="/toucan-5854897_1920.jpg"
            layout="responsive"
            alt={"Tucán"}
            width={1280}
            height={1920}
            objectFit="cover"
          />
          <p className="text-xs">
            Image by{" "}
            <a
              href="https://pixabay.com/users/paulswilderness-18039230"
              target="_blank"
            >
              Paulswilderness
            </a>{" "}
            from{" "}
            <a href="https://pixabay.com/" target="_blank">
              Pixabay
            </a>
          </p>
        </div>
      </div>
      <div ref={endOfPageRef} />
    </div>
  );
}

// Hint: For simpler code, consider using a UI library like DaisyUI or Headless UI components.
