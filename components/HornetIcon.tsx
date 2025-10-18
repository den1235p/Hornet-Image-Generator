
import React from 'react';

// A simplified representation of Hornet's head
const HornetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg" 
      {...props}
    >
      <path d="M50 95C25 95 5 75 5 50C5 25 25 5 50 5C75 5 95 25 95 50C95 75 75 95 50 95Z" fill="#E0E0E0"/>
      <path d="M30 40C20 20 40 10 40 10C50 30 40 50 30 40Z" fill="#1a1a1a"/>
      <path d="M70 40C80 20 60 10 60 10C50 30 60 50 70 40Z" fill="#1a1a1a"/>
      <path d="M20,60 A40,25 0 0,0 80,60" fill="none" stroke="#1a1a1a" strokeWidth="3"/>
    </svg>
  );
};

export default HornetIcon;
