import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

interface Props {
  size: number | string;
  color?: string;
}

export default function CaveatIcon({ 
  size,
  color = '#FB2C36', 
}: Props) {
  const iconSize = size;
  
  return (
    <Svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 40 40"
      fill="none"
    >
      <Path
        d="M0 19.9977C0 8.95329 8.95329 0 19.9977 0C31.0422 0 39.9954 8.95329 39.9954 19.9977C39.9954 31.0422 31.0422 39.9954 19.9977 39.9954C8.95329 39.9954 0 31.0422 0 19.9977Z"
        fill={color}
      />
      <G clipPath="url(#clip0_559_5)">
        <Path
          d="M28.0993 24.9972L21.4334 13.3319C21.2881 13.0754 21.0773 12.8621 20.8226 12.7137C20.5679 12.5653 20.2784 12.4871 19.9836 12.4871C19.6888 12.4871 19.3993 12.5653 19.1446 12.7137C18.8899 12.8621 18.6791 13.0754 18.5337 13.3319L11.8678 24.9972C11.7209 25.2517 11.6439 25.5404 11.6445 25.8342C11.6452 26.128 11.7235 26.4164 11.8715 26.6702C12.0196 26.924 12.2321 27.1341 12.4875 27.2793C12.7429 27.4245 13.0322 27.4996 13.326 27.4969H26.6578C26.9502 27.4966 27.2374 27.4194 27.4905 27.273C27.7436 27.1266 27.9537 26.9162 28.0997 26.663C28.2458 26.4097 28.3227 26.1224 28.3226 25.83C28.3225 25.5376 28.2455 25.2504 28.0993 24.9972Z"
          stroke="white"
          strokeWidth="1.66648"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M19.9922 17.498V20.8314"
          stroke="white"
          strokeWidth="1.66648"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M19.9922 24.1639H20.0005"
          stroke="white"
          strokeWidth="1.66648"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_559_5">
          <Rect
            width="19.9977"
            height="19.9977"
            fill="white"
            transform="translate(9.99316 9.9989)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
