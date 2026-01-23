import { Image, View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import SafeScreen from "@/components/safe-screen";


export default function Index() {
  const cards = [
    {
      imageUrl: require("../assets/images/public/clothes.png"),
      title: "服装の参考に",
      description: "今、みんなが何を着ているのか",
    },
    {
      imageUrl: require("../assets/images/public/umbrella.png"),
      title: "傘の判断に", 
      description: "実際に傘が必要だったかどうか",
    },
    {
      imageUrl: require("../assets/images/public/train.png"),
      title: "移動の計画に",
      description: "リアルタイムの混雑や遅延情報",
    },
  ];

  return (
    <SafeScreen changeBackgroundColor="darkBlue">
      <View className="flex justify-center items-center">
        <Image
          source={require("../assets/images/public/logo.png")}
          style={{
            width: 80,
            height: 80,
          }}
          resizeMode="contain"
        />
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
              <Image
                source={card.imageUrl}
                style={{
                  width: 40,
                  height: 40,
                }}
                resizeMode="contain"
              />
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
      {/* 消すやつ */}
      <TouchableOpacity 
        className="flex justify-center items-center bg-white py-5 w-full rounded-2xl mt-10"
        onPress={() => {router.push("/auth"); }}
      >
        <Text className="text-primary font-bold">はじめる</Text>
      </TouchableOpacity>
      </View>
    </SafeScreen>
  );
}
