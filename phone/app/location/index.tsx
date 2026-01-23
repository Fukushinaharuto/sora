import SafeScreen from "@/components/safe-screen";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { prefectures} from '@/lib/prefectures'; 

export default function Index() {

  return (
    <SafeScreen changeBackgroundColor="white">
      <Text className="text-black text-2xl font-bold mt-3">地域を選択</Text>
      <Text className="text-primaryLight mt-3">情報を確認したい都道府県を選んでください</Text>
      <TouchableOpacity className="flex-row gap-5 items-center px-4 py-6 rounded-2xl mt-6 bg-white border border-borderColor">
        <Image
          source={require("../../assets/images/public/current-location.png")}
          style={{
            width: 20,
            height: 20,
          }}
          resizeMode="contain"
        />
        <View>
          <Text className="text-primary font-bold">現在地を使用</Text>
          <Text className="text-primary text-sm">東京都渋谷区</Text>
        </View>
        
      </TouchableOpacity>
      <View className="flex-row items-center gap-2 mt-6 mb-2">
        <Image
          source={require("../../assets/images/public/location-select.png")}
          style={{
            width: 16,
            height: 16,
          }}
          resizeMode="contain"
        />
        <Text className="text-sm text-primaryLight">都道府県を選択</Text>
      </View>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {prefectures.map((prefecture, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row justify-between items-center px-4 py-5 rounded-2xl mt-2 bg-white border border-borderColor"
            onPress={() =>
              router.push({
                pathname: "/location/cities",
                params: { prefecture: prefecture.name },
              })
            }
          >
            <Text className="text-primary font-bold">{prefecture.name}</Text>
            <Image
              source={require("../../assets/images/public/arrow-right.png")}
              style={{
                width: 18,
                height: 18,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeScreen>
  );
}