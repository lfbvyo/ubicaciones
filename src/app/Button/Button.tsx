import "react";

interface CustomButtonProps {
  id: string | number;
  children: React.ReactNode;
  selected?: boolean;
  onClick: (id: string | number) => void;
}

export const CustomButton = ({
  id,
  onClick,
  children,
  selected,
}: CustomButtonProps) => (
  <button
    key={id}
    className={` ${
      selected ? "text-[#dec7c7]" : "text-[#faf6e1]"
    }  w-full text-center px-3 py-2 bg-pastel-gray rounded border-2 border-pastel-yellow hover:bg-pastel-gray-hover transition duration-200`}
    onClick={() => onClick(id)}
  >
    {children}
  </button>
);
