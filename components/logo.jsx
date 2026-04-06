import { View } from "react-native";
import Svg, { Circle, Path, Text as SvgText } from "react-native-svg";

export default function Logo({ size = 100 }) {
  const scale = size / 120;

  return (
    <View style={{ alignSelf: "center", marginBottom: 16 }}>
      <Svg width={size} height={size} viewBox="0 0 120 120">
        <Circle cx="60" cy="60" r="56" fill="#e8d5c4" />

        <Path
          d="M38 42 Q38 35 45 35 L92 35 Q99 35 99 42 L99 70 Q99 77 92 77 L60 77 L52 88 L52 77 L45 77 Q38 77 38 70 Z"
          fill="#2c1a10"
          opacity="0.85"
        />

        <Path
          d="M30 50 Q22 50 22 60 Q22 75 35 78 Q40 79 42 75 Q44 71 40 69 Q36 67 36 62 Q36 55 42 53"
          fill="none"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        <Path
          d="M35 57 Q33 60 35 64 Q37 67 36 70"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <Path
          d="M44 38 Q52 45 52 55 Q52 65 44 72"
          fill="none"
          stroke="white"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        <Path
          d="M49 32 Q60 41 60 55 Q60 69 49 78"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.75"
        />

        <Path
          d="M54 27 Q67 38 67 55 Q67 72 54 83"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />

        <Circle cx="26" cy="54" r="2" fill="white" opacity="0.8" />
        <Circle cx="24" cy="60" r="2" fill="white" opacity="0.8" />
        <Circle cx="26" cy="66" r="2" fill="white" opacity="0.8" />

        <SvgText
          x="68"
          y="54"
          fontSize="13"
          fontWeight="bold"
          fill="#6b3a2a"
          textAnchor="middle"
          fontFamily="serif"
        >
          Hear Me
        </SvgText>

        <SvgText
          x="68"
          y="70"
          fontSize="14"
          fontWeight="bold"
          fill="#c8956c"
          textAnchor="middle"
          fontFamily="serif"
        >
          Out
        </SvgText>
      </Svg>
    </View>
  );
}