// components/icons/UserIcon.tsx
import Svg, { Path } from "react-native-svg";

type Props = {
  size: number;
  color: string;
};

export default function UserIcon({ size, color }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        d="M14.2495 15.749V14.249C14.2495 13.4534 13.9334 12.6903 13.3708 12.1277C12.8082 11.5651 12.0452 11.249 11.2495 11.249H6.74951C5.95386 11.249 5.1908 11.5651 4.62819 12.1277C4.06558 12.6903 3.74951 13.4534 3.74951 14.249V15.749"
        stroke={color}
        strokeWidth={1.49987}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.99951 8.24976C10.6564 8.24976 11.9995 6.90661 11.9995 5.24976C11.9995 3.5929 10.6564 2.24976 8.99951 2.24976C7.34266 2.24976 5.99951 3.5929 5.99951 5.24976C5.99951 6.90661 7.34266 8.24976 8.99951 8.24976Z"
        stroke={color}
        strokeWidth={1.49987}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
