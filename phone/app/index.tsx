import { LogoIcon, starts } from "@/components/icons";
import SafeScreen from "@/components/safe-screen";
import { getCurrentLocation } from "@/lib/utils/get-current-location";
import { useLocationStore } from "@/store/useCurrentGet";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

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
    },
    {
      icon: starts.RainIcon,
      title: "傘の判断に", 
      description: "実際に傘が必要だったかどうか",
    },
    {
      icon: starts.TrainIcon,
      title: "移動の計画に",
      description: "リアルタイムの混雑や遅延情報",
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
        <LogoIcon size={80} color="white" />
        <Text className="text-white text-3xl mt-6 font-bold">行動で見る天気</Text>
        <View className="flex justify-center items-center my-6">
          <Text className="text-white/80">天気予報だけじゃない。</Text>
          <Text className="text-white/80">今、近くの人がどう過ごしているか。</Text>
          <Text className="text-white/80">それが一番の判断材料です。</Text>
        </View>
        
        {cards.map((card, index) => (
            <View 
              key={index}
              className="bg-white/10 w-full rounded-xl p-4 mt-4"
            >
              <card.icon size={40} color="white" />
              <Text className="text-white text-xl font-bold">{card.title}</Text>
              <Text className="text-white/70 text-base mt-2">{card.description}</Text>
            </View>
        ))}
        <TouchableOpacity 
          className="flex justify-center items-center bg-white py-5 w-full rounded-2xl mt-10"
          onPress={() => {router.push("/location"); }}
        >
          <Text className="text-primary font-bold">はじめる</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeScreen>
  );
}
