// components/icons/CalendarIcon.tsx
import Svg, { Path } from "react-native-svg";

type Props = {
  size: number;
  color: string;
};

export default function TrainIcon({ size, color }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* 背景円 */}
      <Path 
        d="M0 23.998C0 10.7443 10.7443 0 23.998 0C37.2516 0 47.9959 10.7443 47.9959 23.998C47.9959 37.2516 37.2516 47.9959 23.998 47.9959C10.7443 47.9959 0 37.2516 0 23.998Z" 
        fill={color} 
      />
      
      {/* カレンダー外枠 */}
      <Path 
        d="M29.9974 14.9988H17.9985C16.894 14.9988 15.9986 15.8941 15.9986 16.9986V28.9976C15.9986 30.1021 16.894 30.9974 17.9985 30.9974H29.9974C31.1019 30.9974 31.9973 30.1021 31.9973 28.9976V16.9986C31.9973 15.8941 31.1019 14.9988 29.9974 14.9988Z" 
        stroke={"white"} 
        strokeWidth={1.99983}
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* 中央横線 */}
      <Path 
        d="M15.9986 22.998H31.9973" 
        stroke={"white"} 
        strokeWidth={1.99983}
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* 中央縦線 */}
      <Path 
        d="M23.9979 14.9988V22.9988" 
        stroke={"white"} 
        strokeWidth={1.99983}
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* 左下矢印 */}
      <Path 
        d="M19.9984 30.9974L17.9984 33.9974" 
        stroke={"white"} 
        strokeWidth={1.99983}
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* 右下矢印 */}
      <Path 
        d="M29.9976 33.9974L27.9976 30.9974" 
        stroke={"white"} 
        strokeWidth={1.99983}
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* 左中央点 */}
      <Path 
        d="M19.9983 26.9978H20.0083" 
        stroke={"white"} 
        strokeWidth={1.99983}
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* 右中央点 */}
      <Path 
        d="M27.9976 26.9978H28.0076" 
        stroke={"white"} 
        strokeWidth={1.99983}
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
}
