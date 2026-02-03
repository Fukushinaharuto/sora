// components/icons/ClockIcon.tsx
import Svg, { Path, G, Defs, ClipPath, Rect } from "react-native-svg";

type Props = {
  size: number;
  color: string;
};

export default function TemperatureIcon({ size, color }: Props) {

  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Defs>
        <ClipPath id="clock_clip">
          <Rect width={17.9985} height={17.9985} fill="white" />
        </ClipPath>
      </Defs>

      <G clipPath="url(#clock_clip)">
        <Path
          d="M8.99951 6.74941C8.3303 6.73863 7.6767 6.95194 7.14269 7.35541C6.60868 7.75888 6.22492 8.32934 6.05247 8.97604C5.88002 9.62273 5.92877 10.3085 6.19098 10.9243C6.45319 11.5401 6.91379 12.0505 7.49951 12.3744"
          stroke={color}
          strokeWidth={1.49987}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8.99927 2.24976V3.74976"
          stroke={color}
          strokeWidth={1.49987}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M4.94966 13.7988L3.89966 14.8488"
          stroke={color}
          strokeWidth={1.49987}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14.9986 2.99975V10.9041C15.5705 11.2342 16.0175 11.7439 16.2702 12.354C16.5229 12.9641 16.5672 13.6405 16.3963 14.2783C16.2254 14.9162 15.8488 15.4798 15.3249 15.8818C14.801 16.2838 14.1591 16.5017 13.4988 16.5017C12.8384 16.5017 12.1965 16.2838 11.6726 15.8818C11.1488 15.4798 10.7721 14.9162 10.6012 14.2783C10.4303 13.6405 10.4747 12.9641 10.7274 12.354C10.9801 11.7439 11.427 11.2342 11.9989 10.9041V2.99975C11.9989 2.60196 12.1569 2.22046 12.4382 1.93918C12.7195 1.6579 13.101 1.49988 13.4988 1.49988C13.8966 1.49988 14.2781 1.6579 14.5593 1.93918C14.8406 2.22046 14.9986 2.60196 14.9986 2.99975Z"
          stroke={color}
          strokeWidth={1.49987}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M2.99976 9.74915H1.49976"
          stroke={color}
          strokeWidth={1.49987}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M4.75477 5.50464L3.69727 4.44714"
          stroke={color}
          strokeWidth={1.49987}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
