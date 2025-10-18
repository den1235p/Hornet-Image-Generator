import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = "font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 disabled:bg-red-900 disabled:text-gray-400",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 disabled:bg-gray-800 disabled:text-gray-500",
  };

  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;