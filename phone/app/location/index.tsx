import { arrows, locations } from "@/components/icons";
import SafeScreen from "@/components/safe-screen";
import { colors } from "@/lib/colors";
import { useUpdateCity } from "@/lib/hooks/useUser";
import { prefectures } from '@/lib/prefectures';
import { getCurrentLocation } from "@/lib/utils/get-current-location";
import * as Location from "expo-location";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function Index() {
  const { submit: updateCitySubmit, isLoading: updateCityIsLoading } = useUpdateCity();
  const handleUpdateCitySubmit = async () => {
    try {
      const { latitude, longitude } = await getCurrentLocation();
      const geocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (geocode.length === 0) {
        Toast.show({
          type: "error",
          text1: "現在地の取得に失敗しました！",
        });
        return;
      }
      const address = geocode[0];
      const city = address.city;
      if (!city) {
        Toast.show({
          type: "error",
          text1: "現在地の取得に失敗しました！",
        });
        return;
      }
      updateCitySubmit({ cityName: city})
    } catch (e) {
      console.error(e);
      Toast.show({
        type: "error",
        text1: "現在地の取得に失敗しました！",
      });
      return;
    }
  };

  if (updateCityIsLoading) return;
  return (
    <SafeScreen changeBackgroundColor="white">
      <Text className="text-black text-2xl font-bold mt-3">地域を選択</Text>
      <Text className="text-primaryLight mt-3">情報を確認したい都道府県を選んでください</Text>
      <TouchableOpacity 
        className="flex-row gap-5 items-center px-4 py-6 rounded-2xl mt-6 bg-white border border-borderColor"
        onPress={handleUpdateCitySubmit}
        disabled={updateCityIsLoading}
      >
        <locations.CurrentLocationIcon size={24} color={colors.primary} />
        <View>
          <Text className="text-primary font-bold">現在地を使用</Text>
          <Text className="text-primary text-sm">現在地から市町村区を自動で選択。</Text>
        </View>   
      </TouchableOpacity>
      <View className="flex-row items-center gap-2 mt-6 mb-2">
        <locations.LocationIcon size={16} color={colors.primaryLight} />
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
                pathname: "/location/municipalities",
                params: { prefecture: prefecture.name },
              })
            }
          >
            <Text className="text-primary font-bold">{prefecture.name}</Text>
            <arrows.ArrowRightIcon size={18} color={colors.primary} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {updateCityIsLoading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "white",
            opacity: 0.9,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          pointerEvents="auto" // タッチ操作をブロック
        >
          <Text className="text-primary font-bold text-lg">現在地を取得中...</Text>
        </View>
      )}
    </SafeScreen>
  );
}