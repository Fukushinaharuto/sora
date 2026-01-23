// components/SafeScreen.tsx
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  children: ReactNode;
  changeBackgroundColor: "white" | "darkBlue";
};

export default function SafeScreen({
  children,
  changeBackgroundColor = "white",
}: Props) {
  const insets = useSafeAreaInsets();
  const colors = {
    bgPrimary: "#45556C",
    bgPrimaryLight: "#314158",
    bgSecondary: "#F8FAFC"
  };

  switch (changeBackgroundColor) {
    case "darkBlue":
      return (
        <LinearGradient
        colors={[colors.bgPrimaryLight, colors.bgPrimary]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: Math.max(insets.left, 20),
          paddingRight: Math.max(insets.right, 20),
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
            backgroundColor: colors.bgSecondary,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: Math.max(insets.left, 20),
            paddingRight: Math.max(insets.right, 20),
          }}
        >
          {children}
        </View>
      );
  } 
}
