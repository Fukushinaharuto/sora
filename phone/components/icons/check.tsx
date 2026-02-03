// components/icons/CheckIcon.tsx
import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface CheckIconProps {
  size?: number;
  color?: string;
}

export default function CheckIcon({
  size = 20,
  color = 'white'
}: CheckIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      {/* チェックマーク（✓） */}
      <Path 
        d="M17 5L7.5 14L3 10" 
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
