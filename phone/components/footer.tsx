import { footers } from "@/components/icons";
import { colors } from "@/lib/colors";
import { router, usePathname } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  setFooterHeight: (height: number) => void
}
export function Footer({setFooterHeight}: Props) {
  const pathname = usePathname();
  const cards = [
    {
      icon: footers.MoveIcon,
      text: "ホーム",
      href: "/post",
    },
    {
      icon: footers.PostAddIcon,
      text: "投稿",
      href: "/post/add",
    },
    {
      icon: footers.ProfileIcon,
      text: "プロフィール",
      href: "/profile",
    },
  ] as const;

  return (
    <View 
      onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height)}
      className="flex-row absolute bottom-0 left-0 right-0 z-50 bg-white px-6 py-3 border-t border-borderColor"
    >
      {cards.map((card) => {
        const isActive = pathname === card.href;
        return (
          <TouchableOpacity
            key={card.text}
            className="flex-1 gap-1 items-center justify-center"
            onPress={() => router.push(card.href)}
            disabled={isActive}
          >
            {isActive ? (
              <View className="w-14 h-14 rounded-full justify-center items-center bg-primary" >
                <card.icon
                  size={50}
                  color="#fff"
                />
              </View>
            ) : (
              <card.icon
                size={50}
                color={colors.textPlaceholder}
              />
            )}
            <Text
              className={`text-xs ${
                isActive ? "text-black font-bold" : "text-textPlaceholder"
              }`}
            >
              {card.text}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
