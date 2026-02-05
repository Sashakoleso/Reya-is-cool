import {FC} from "react";

interface WarnIconProps {
  size?: number;
}

export const WarnIcon: FC<WarnIconProps> = ({ size = 64 }) => (
  <svg 
    width={size} 
    height={size} 
    fill="none" 
    viewBox="0 0 64 64" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M32 4L4 56h56L32 4z" fill="none" stroke="#F9F9FA" strokeLinecap="round" strokeLinejoin="round"
          strokeWidth="2"></path>
    <path d="M32 24v12" stroke="#F9F9FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
    <circle cx="32" cy="44" fill="#F9F9FA" r="2"></circle>
  </svg>
);
