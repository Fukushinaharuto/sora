// components/icons/PlusIcon.tsx
import Svg, { Path } from "react-native-svg";

type Props = {
  size: number;
  color: string;
};

export default function PostAddIcon({ size, color }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      {/* 横線 */}
      <Path 
        d="M12.1655 17.9985H23.8322" 
        stroke={color}
        strokeWidth={1.66652}
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* 縦線 */}
      <Path 
        d="M17.9985 12.166V23.8327" 
        stroke={color}
        strokeWidth={1.66652}
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
}
