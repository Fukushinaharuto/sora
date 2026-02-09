// components/icons/GraphIcon.tsx
import Svg, { Path } from "react-native-svg";

type Props = {
  size: number;
  color: string;
};

export default function RainIcon({
  size,
  color,
}: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* 背景円（白0.2不透明） */}
      <Path 
        d="M0 23.998C0 10.7443 10.7443 0 23.998 0C37.2516 0 47.9959 10.7443 47.9959 23.998C47.9959 37.2516 37.2516 47.9959 23.998 47.9959C10.7443 47.9959 0 37.2516 0 23.998Z" 
        fill={color} 
      />
      
      {/* グラフ横線 */}
      <Path 
        d="M33.9971 23.998C33.7268 21.5349 32.557 19.2582 30.7118 17.6043C28.8666 15.9505 26.4758 15.0359 23.9979 15.0359C21.52 15.0359 19.1293 15.9505 17.2841 17.6043C15.4389 19.2582 14.269 21.5349 13.9988 23.998H33.9971Z" 
        stroke={"white"} 
        strokeWidth={1.99983}
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* グラフ縦上昇線 */}
      <Path 
        d="M23.9979 23.998V31.998C23.9979 32.5285 24.2086 33.0372 24.5837 33.4123C24.9588 33.7873 25.4675 33.998 25.9979 33.998C26.5284 33.998 27.0371 33.7873 27.4121 33.4123C27.7872 33.0372 27.9979 32.5285 27.9979 31.998" 
        stroke={"white"} 
        strokeWidth={1.99983}
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* グラフ縦線（プラス記号の下部） */}
      <Path 
        d="M23.9979 13.9988V14.9988" 
        stroke={"white"} 
        strokeWidth={1.99983}
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
}
