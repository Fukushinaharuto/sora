// components/icons/CheckIcon.tsx
import Svg, { Path } from "react-native-svg";

type Props = {
  size: number;
  color: string;
};

export default function PostIcon({ size, color }: Props) {

  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        d="M16.4987 5.24951L10.1243 11.624L6.37458 7.87429L1.5 12.7489"
        stroke={color}
        strokeWidth={1.49987}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.999 5.24951H16.499V9.74951"
        stroke={color}
        strokeWidth={1.49987}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
