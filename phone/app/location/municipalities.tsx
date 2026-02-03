import SafeScreen from "@/components/safe-screen";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import { arrows, locations } from "@/components/icons";
import { colors } from "@/lib/colors";


export default function MunicipalitiesScreen() {
  const { prefecture } = useLocalSearchParams<{ prefecture: string }>();
  const cities = ["1","2","3","4","5","6","7","8","9","10","11","12","13"];
  const [selectedCity, setSelectedCity] = useState("");
  const [footerHeight, setFooterHeight] = useState(0);

  return (
    <SafeScreen changeBackgroundColor="white">
      <TouchableOpacity
        className="flex-row items-center gap-2 py-2 self-start"
        onPress={() => router.back()}
      >
        <arrows.ArrowLeftIcon size={18} color={colors.primaryLight} />
        <Text className="text-black font-medium">戻る</Text>
      </TouchableOpacity>

      <Text className="text-black text-2xl font-bold mt-3">
        {prefecture}の市町村区
      </Text>
      <View className="flex-row items-center gap-2 mt-6 mb-2">
        <locations.LocationIcon size={16} color={colors.primaryLight} />
        <Text className="text-sm text-primaryLight">市町村区を選んでください</Text>
      </View>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: footerHeight }}
      >
        {cities.map((city) => (
          <TouchableOpacity
            key={city}
            className={`px-4 py-5 rounded-2xl mt-2 border border-borderColor ${
              selectedCity === city ? "bg-primary" : "bg-white"
            }`}
            onPress={() => setSelectedCity(city)}
          >
            <Text 
              className={`text-primary font-bold ${
                selectedCity === city && "text-white"
              }`}
            >
              {city}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* フッター */}
      <View
        onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height)}
        className="bg-white border-t border-borderColor px-4 py-10"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Text className="text-primaryLight mb-3 text-sm">
          ※ 選択できる地域は1つのみです
        </Text>
        <TouchableOpacity
          className={`w-full py-4 rounded-2xl ${
            selectedCity ? "bg-primary" : "bg-primary/40"
          }`}
          disabled={!selectedCity}
          onPress={() => router.push("/post")}
        >
          <Text className="text-white font-bold text-center text-lg">
            {selectedCity
              ? `${selectedCity}の情報を見る`
              : "地域を選択してください"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
}
