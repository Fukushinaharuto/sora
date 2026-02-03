// components/icons/ClockIcon.tsx
import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

interface ClockIconProps {
  size: number;
  color?: string;
}

export default function TimeIcon({
  size,
  color = '#62748E'
}: ClockIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <G clipPath="url(#clip0_218_1587)">
        <Path 
          d="M5.99798 10.9966C8.75855 10.9966 10.9964 8.75874 10.9964 5.99816C10.9964 3.23758 8.75855 0.999695 5.99798 0.999695C3.2374 0.999695 0.999512 3.23758 0.999512 5.99816C0.999512 8.75874 3.2374 10.9966 5.99798 10.9966Z" 
          stroke={color}
          strokeWidth="0.999693"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path 
          d="M5.99805 2.99908V5.99816L7.99743 6.99786" 
          stroke={color}
          strokeWidth="0.999693"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_218_1587">
          <Rect width="11.9963" height="11.9963" fill="white"/>
        </ClipPath>
      </Defs>
    </Svg>
  );
}
