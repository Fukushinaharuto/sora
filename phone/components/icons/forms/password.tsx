// components/icons/LockIcon.tsx
import Svg, { Path } from "react-native-svg";

type Props = {
  size: number;
  color: string;
};

export default function PasswordIcon({ size, color }: Props) {

  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        d="M14.249 8.24927H3.74987C2.92152 8.24927 2.25 8.92078 2.25 9.74914V14.9987C2.25 15.827 2.92152 16.4986 3.74987 16.4986H14.249C15.0773 16.4986 15.7488 15.827 15.7488 14.9987V9.74914C15.7488 8.92078 15.0773 8.24927 14.249 8.24927Z"
        stroke={color}
        strokeWidth={1.49987}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.24951 8.24976V5.24976C5.24951 4.25519 5.6446 3.30137 6.34786 2.59811C7.05112 1.89484 8.00495 1.49976 8.99951 1.49976C9.99407 1.49976 10.9479 1.89484 11.6512 2.59811C12.3544 3.30137 12.7495 4.25519 12.7495 5.24976V8.24976"
        stroke={color}
        strokeWidth={1.49987}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
