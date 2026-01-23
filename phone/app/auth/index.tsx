import { Image, Text, View  } from "react-native";
import FormCard from "@/components/form-card";
import SafeScreen from "@/components/safe-screen";

export default function Index() {
  
  return (
    <SafeScreen changeBackgroundColor="darkBlue">
      <View className="flex-1 justify-center items-center">
        <Image
          source={require("../../assets/images/public/logo.png")}
          style={{
            width: 80,
            height: 80,
          }}
          resizeMode="contain"
        />
        <Text className="text-white text-3xl mt-6 font-bold">行動で見る天気</Text>
        <Text className="text-white/80 my-6">地域のリアルな情報を共有しよう</Text>
        <FormCard />
      </View>
    </SafeScreen>
  );
}
