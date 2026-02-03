// components/icons/UserIcon.tsx
import Svg, { Path } from "react-native-svg";

type Props = {
  size: number;
  color: string;
};

export default function ProfileIcon({ size, color }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      {/* ユーザー枠線（下部） */}
      <Path 
        d="M23.8322 25.4985V23.8319C23.8322 22.9478 23.481 22.1 22.8559 21.4748C22.2308 20.8497 21.3829 20.4985 20.4989 20.4985H15.4989C14.6148 20.4985 13.767 20.8497 13.1418 21.4748C12.5167 22.1 12.1655 22.9478 12.1655 23.8319V25.4985" 
        stroke={color} 
        strokeWidth={1.66652}
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* 顔（円） */}
      <Path 
        d="M17.9986 17.1662C19.8396 17.1662 21.3319 15.6738 21.3319 13.8328C21.3319 11.9919 19.8396 10.4995 17.9986 10.4995C16.1577 10.4995 14.6653 11.9919 14.6653 13.8328C14.6653 15.6738 16.1577 17.1662 17.9986 17.1662Z" 
        stroke={color} 
        strokeWidth={1.66652}
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
}
