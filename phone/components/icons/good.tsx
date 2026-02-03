import Svg, { Path } from "react-native-svg";

type Props = {
  size: number;
  color: string;
  filled?: boolean;
};

export default function GoodIcon({ size, color, filled = false }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M4.66626 6.66614V14.6661"
        stroke={filled ? "none" : color}
        fill={filled ? color : "none"}
        strokeWidth={1.33322}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.9993 3.91982L9.33269 6.66625H13.219C13.426 6.66625 13.6301 6.71444 13.8153 6.807C14.0004 6.89957 14.1614 7.03396 14.2856 7.19954C14.4098 7.36512 14.4937 7.55734 14.5307 7.76098C14.5678 7.96462 14.5569 8.17408 14.4989 8.37277L12.9457 13.7057C12.8649 13.9826 12.6965 14.2258 12.4658 14.3989C12.235 14.572 11.9543 14.6656 11.6658 14.6656H2.66659C2.313 14.6656 1.97389 14.5251 1.72386 14.2751C1.47384 14.0251 1.33337 13.6859 1.33337 13.3324V7.99947C1.33337 7.64588 1.47384 7.30677 1.72386 7.05674C1.97389 6.80672 2.313 6.66625 2.66659 6.66625H4.50644C4.75447 6.66612 4.99755 6.5968 5.20835 6.46608C5.41914 6.33537 5.58929 6.14844 5.69967 5.92632L7.99947 1.33337C8.31383 1.33727 8.62324 1.41215 8.9046 1.55242C9.18595 1.69269 9.43197 1.89473 9.62427 2.14344C9.81657 2.39215 9.95018 2.6811 10.0151 2.9887C10.0801 3.2963 10.0747 3.6146 9.9993 3.91982Z"
        stroke={filled ? "none" : color}
        fill={filled ? color : "none"}
        strokeWidth={1.33322}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
