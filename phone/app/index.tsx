import { starts } from "@/components/icons";
import SafeScreen from "@/components/safe-screen";
import { colors } from "@/lib/colors";
import { getCurrentLocation } from "@/lib/utils/get-current-location";
import { useLocationStore } from "@/store/useCurrentGet";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const setLocation = useLocationStore((state) => state.setLocation);
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    const checkLocation = async () => {
      const { latitude, longitude } = await getCurrentLocation();
      setLocation(latitude, longitude);
      const location = await SecureStore.getItemAsync("user_city");
      if (location) {
        // 地域設定あり → post へ
        router.replace(`/post?city_id=${location}`);
      } 
      setChecking(false);
      return;
    };

    checkLocation();
  }, []);

  const cards = [
    {
      icon: starts.ClothesIcon,
      title: "服装の参考に",
      description: "今、みんなが何を着ているのか",
      color: colors.orangeDark,
    },
    {
      icon: starts.RainIcon,
      title: "傘の判断に", 
      description: "実際に傘が必要だったかどうか",
      color: colors.yellow,
    },
    {
      icon: starts.TrainIcon,
      title: "移動の計画に",
      description: "リアルタイムの混雑や遅延情報",
      color: colors.orangeDark,
    },
  ];

  if (checking) return;

  return (
    <SafeScreen changeBackgroundColor="darkBlue">
      <ScrollView 
        contentContainerClassName="flex justify-center items-center"
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <Image 
          source={require('@/assets/images/public/logo.png')} 
          className="w-40 h-40 mt-4"
          style={{ resizeMode: 'contain' }} 
        />
        <View className="flex justify-center items-center mb-6">
          <Text className="text-white/80 shadow font-bold">その天気に、</Text>
          <Text className="text-white/80 font-bold">あなたはどうチョイスする？</Text>
        </View>
        
        {cards.map((card, index) => (
            <View 
              key={index}
              className="bg-white w-full rounded-xl p-4 mt-4"
            >
              <card.icon size={40} color={card.color} />
              <Text className="text-black font-bold mt-2">{card.title}</Text>
              <Text className="text-black/70 text-base mt-2">{card.description}</Text>
            </View>
        ))}
        <TouchableOpacity 
          className="flex justify-center items-center bg-orangeDark py-5 w-full rounded-2xl mt-10"
          onPress={() => {router.push("/location"); }}
        >
          <Text className="text-white font-bold">はじめる</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeScreen>
  );
}
