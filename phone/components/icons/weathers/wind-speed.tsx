// components/icons/StarIcon.tsx
import Svg, { Path } from "react-native-svg";

type Props = {
  size: number;
  color: string;
};

export default function WindSpeedIcon({ size, color }: Props) {

  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        d="M5.24976 12.2246C6.89976 12.2246 8.24976 10.8521 8.24976 9.18711C8.24976 8.31711 7.82226 7.49211 6.96726 6.79461C6.11226 6.09711 5.46726 5.06211 5.24976 3.97461C5.03226 5.06211 4.39476 6.10461 3.53226 6.79461C2.66976 7.48461 2.24976 8.32461 2.24976 9.18711C2.24976 10.8521 3.59976 12.2246 5.24976 12.2246Z"
        stroke={color}
        strokeWidth={1.49987}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.41917 4.94954C9.93495 4.12546 10.3006 3.21647 10.4991 2.26477C10.874 4.13961 11.999 5.93946 13.4988 7.13935C14.9987 8.33925 15.7486 9.76413 15.7486 11.264C15.7529 12.3006 15.4493 13.3152 14.8763 14.1791C14.3033 15.0429 13.4867 15.7172 12.53 16.1165C11.5733 16.5157 10.5196 16.6218 9.50254 16.4215C8.48545 16.2212 7.55073 15.7234 6.81689 14.9912"
        stroke={color}
        strokeWidth={1.49987}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
