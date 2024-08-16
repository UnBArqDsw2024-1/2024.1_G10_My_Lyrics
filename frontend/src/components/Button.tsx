// components/Button.tsx
import React from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type, children }) => {
  return (
    <button
      className="w-3/4 py-3 text-xl font-bold bg-black text-white rounded-2xl transition-all duration-300 hover:bg-white hover:text-black"
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
