import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

interface NotificationIconProps {
  size?: number | string;
  color?: string;
  width?: number | string;
  height?: number | string;
}

export default function NotificationSmallIcon({ 
  size = 56, 
  color = '#FF000C', 
  width, 
  height 
}: NotificationIconProps) {
  const iconSize = size || width || height || 56;
  
  return (
    <Svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 56 56"
      fill="none"
    >
      <G opacity="0.942423">
        <Path 
          d="M0 27.9991C0 12.5356 12.5356 0 27.9991 0C43.4626 0 55.9983 12.5356 55.9983 27.9991C55.9983 43.4626 43.4626 55.9983 27.9991 55.9983C12.5356 55.9983 0 43.4626 0 27.9991Z" 
          fill={color}
        />
        <Path 
          d="M17.499 26.8325L38.499 20.9991V34.9991L17.499 30.3325V26.8325Z" 
          stroke="white" 
          strokeWidth="2.33326" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <Path 
          d="M27.5317 33.5986C27.4091 34.0429 27.2003 34.4587 26.917 34.8223C26.6337 35.1859 26.2816 35.4901 25.8808 35.7176C25.48 35.9451 25.0382 36.0914 24.5808 36.1482C24.1234 36.205 23.6594 36.1712 23.215 36.0486C22.7707 35.926 22.3549 35.7172 21.9913 35.4339C21.6278 35.1506 21.3235 34.7985 21.096 34.3977C20.8685 33.9968 20.7222 33.5551 20.6654 33.0977C20.6086 32.6403 20.6425 32.1762 20.765 31.7319" 
          stroke="white" 
          strokeWidth="2.33326" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
