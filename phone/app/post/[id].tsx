
import SafeScreen from "@/components/safe-screen";
import { ScrollView, View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { colors } from "@/lib/colors";
import { useState } from "react";
import { Footer } from "@/components/footer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { arrows, categories, weathers, GoodIcon, } from "@/components/icons";
import { router } from "expo-router";

export default function PostShow() {
  const insets = useSafeAreaInsets();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [post, setPost] = useState({
    id: "7",
    isLiked: true,
    message: "傘持って出たけど、午後から晴れてきた。邪魔だった",
      date: "2024-02-18", // 投稿日
      areaCode: "47636", // 名古屋（例）
  })

  const openWeatherDetail = () => {
    const year = 2024;
    const month = 2;
    const day = 18;

    const url =
      "https://www.data.jma.go.jp/obd/stats/etrn/view/daily_s1.php" +
      `?prec_no=51&block_no=47636&year=${year}&month=${month}&day=${day}&view=`;

    Linking.openURL(url);
  };

  return(
    <SafeScreen changeBackgroundColor="white">
      <View 
        onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
        className="z-10 bg-primary border-b border-borderColor px-[20px] pb-4 gap-3"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          paddingTop: Math.max(insets.top, 20),
        }}
      >
        <TouchableOpacity
          className="flex-row items-center gap-2 py-2 self-start mt-3"
          onPress={() => router.back()}
        >
          <arrows.ArrowLeftIcon size={18} color={"white"} />
          <Text className="text-white font-medium">戻る</Text>
      </TouchableOpacity>
      </View>
      <ScrollView
        className="mt-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: Math.max(headerHeight - insets.top + 20, 0),
          paddingBottom: Math.max(footerHeight - insets.bottom + 20, 0),
        }}
      >
        <Image 
          source={require("@/assets/images/public/Image.png")}
          className="w-full h-40 rounded-2xl mt-3" 
        />
        <View 
          className="bg-white border border-borderColor px-4 py-5 rounded-2xl mt-5"
        >
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center justify-center gap-2 bg-bgIcon rounded-full w-10 h-10">
              <categories.ClothesIcon size={20} color={colors.primaryLight} />
            </View>
            <View>
              <Text className="text-black">名古屋の散歩好き</Text>
              <Text className="text-xs text-blackLight">中区周辺 ・ 300m圏内・10分前</Text>            
            </View>
          </View>
          <Text className="text-black mt-3">{post.message}</Text>
          <View className="flex-row justify-between items-center border-t border-borderColor mt-5 pb-3">
            <TouchableOpacity 
              onPress={() => (setPost({...post, isLiked: !post.isLiked}))}
              className={`${
                post.isLiked ? "bg-subLight" : "bg-grayLight"
              } rounded-xl flex-row items-center gap-3 px-5 py-3 mt-3 min-w-0 border border-borderColor`}
            >
              <GoodIcon size={16} color={post.isLiked ? colors.mapIconBlue : colors.primaryLight} filled={post.isLiked}/>
              <Text 
                className={`${post.isLiked ? "text-mapIconBlue font-bold" : "text-primaryLight"} text-sm`}
              >
                参考になった数 8
              </Text>
            </TouchableOpacity>
            <Text className="text-xs text-secondary">10分前</Text>
          </View>
        </View>
        <View className="bg-white border border-borderColor px-4 py-5 rounded-2xl mt-5">
          <View className="flex-row flex-wrap gap-y-3">
            <View className="w-1/2">
              <Text className="text-black text-lg font-bold mb-2">
                この時の天気
              </Text>
            </View>
            <View className="w-1/2" />
              {/* 左上 */}
              <View className="w-1/2 pr-1">
                <View className="bg-white border border-borderColor px-4 py-5 rounded-2xl">
                  <View className="flex-row items-center gap-2">
                    <weathers.TemperatureIcon size={18} color={colors.primaryLight} />
                    <Text className="text-xs text-primaryLight">気温</Text>
                  </View>
                  <Text className="text-black py-2 font-bold">17℃</Text>
                  <Text className="text-blackLight text-xs">体感 16℃</Text>
                </View>
              </View>
              {/* 右上 */}
              <View className="w-1/2 pl-1">
                <View className="bg-white border border-borderColor px-4 py-5 rounded-2xl">
                  <View className="flex-row items-center gap-2">
                    <weathers.PrecipitationProbabilityIcon size={18} color={colors.primaryLight} />
                    <Text className="text-xs text-primaryLight">降水確率</Text>
                  </View>
                  <Text className="text-black py-2 font-bold">20%</Text>
                  <Text className="text-blackLight text-xs">夕方から10%</Text>
                </View>
              </View>

              {/* 左下 */}
              <View className="w-1/2 pr-1">
                <View className="bg-white border border-borderColor px-4 py-5 rounded-2xl">
                  <View className="flex-row items-center gap-2">
                    <weathers.WindSpeedIcon size={18} color={colors.primaryLight} />
                    <Text className="text-xs text-primaryLight">風速</Text>
                  </View>
                  <Text className="text-black py-2 font-bold">3m/s</Text>
                  <Text className="text-blackLight text-xs">北東の風</Text>
                </View>
              </View>    
            </View>
          <TouchableOpacity
            className="w-full py-4 rounded-2xl bg-primary mt-3"
            onPress={openWeatherDetail}
          >
            <Text className="text-white font-bold text-center text-sm">
              詳しい天気予報を見る →
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer setFooterHeight={setFooterHeight} />
    </SafeScreen>
  )
}