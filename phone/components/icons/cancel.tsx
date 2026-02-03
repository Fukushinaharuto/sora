// components/icons/XIcon.tsx
import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

export default function CancelIcon({
  size = 20,
  color = '#45556C'
}: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      {/* 左上→右下 */}
      <Path 
        d="M15 5L5 15" 
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 右上→左下 */}
      <Path 
        d="M5 5L15 15" 
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
