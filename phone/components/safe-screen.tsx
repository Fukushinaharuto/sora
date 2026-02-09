// components/SafeScreen.tsx
import { colors } from "@/lib/colors";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
  changeBackgroundColor: "white" | "darkBlue";
  paddingX?: number;
};

export default function SafeScreen({
  children,
  changeBackgroundColor = "white",
  paddingX = 20
}: Props) {
  const insets = useSafeAreaInsets();

  switch (changeBackgroundColor) {
    case "darkBlue":
      return (
        <LinearGradient
          colors={[colors.blue, "#FFFFFF"]} // ← 上: 青 (#009DFF)、下: 白 (#FFFFFF)
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: Math.max(insets.left, paddingX),
            paddingRight: Math.max(insets.right, paddingX),
          }}
        >
        {children}
      </LinearGradient>
    )
    case "white":
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.secondary,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: Math.max(insets.left, paddingX),
            paddingRight: Math.max(insets.right, paddingX),
          }}
        >
          {children}
        </View>
      );
  } 
}
