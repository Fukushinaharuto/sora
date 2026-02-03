// components/icons/MailIcon.tsx
import Svg, { Path, G, Defs, ClipPath, Rect } from "react-native-svg";

type Props = {
  size: number;
  color: string;
};

export default function MailIcon({ size, color }: Props) {

  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Defs>
        <ClipPath id="mail_clip">
          <Rect width={17.9985} height={17.9985} fill="white" />
        </ClipPath>
      </Defs>

      <G clipPath="url(#mail_clip)">
        <Path
          d="M14.9988 2.99976H2.99987C2.17152 2.99976 1.5 3.67127 1.5 4.49963V13.4989C1.5 14.3272 2.17152 14.9987 2.99987 14.9987H14.9988C15.8272 14.9987 16.4987 14.3272 16.4987 13.4989V4.49963C16.4987 3.67127 15.8272 2.99976 14.9988 2.99976Z"
          stroke={color}
          strokeWidth={1.49987}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16.4987 5.24951L9.77179 9.52415C9.54027 9.6692 9.27257 9.74614 8.99936 9.74614C8.72615 9.74614 8.45845 9.6692 8.22693 9.52415L1.5 5.24951"
          stroke={color}
          strokeWidth={1.49987}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
