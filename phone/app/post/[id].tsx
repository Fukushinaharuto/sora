
import { Footer } from "@/components/footer";
import { GoodIcon, arrows, categories, weathers, } from "@/components/icons";
import { ImageModal } from "@/components/image-modal";
import SafeScreen from "@/components/safe-screen";
import { colors } from "@/lib/colors";
import { useCreateLikePost, useShowPost } from "@/lib/hooks/usePost";
import { timeAgo } from "@/lib/utils/timeAgo";
import { useUserStore } from "@/store/useUserStore";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, Linking, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function PostShow() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const postId = Number(id);
  const insets = useSafeAreaInsets();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [isOpenImageModal, setIsOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const { width } = useWindowDimensions();
  const user = useUserStore((state) => state.user);

  const {
    post,
    isLoading: showPostIsLoading,
    mutate,
  } = useShowPost(postId);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLikeSubmit = (postId: number) => {
    if (!user) {
      Toast.show({
        type: "error",
        text1: "この機能を利用するにはログインが必須です。",
      })
      router.push("/auth"); 
      return
    }
    likeSubmit({
      postId: postId,
    })
  }

  const openWeatherDetail = () => {
    const year = post?.year.toString() ?? "";
    const month = post?.month.toString() ?? "";
    const day = post?.day.toString() ?? "";
    const url =
      "https://www.data.jma.go.jp/obd/stats/etrn/view/daily_s1.php" +
      `?prec_no=51&block_no=47636&year=${year}&month=${month}&day=${day}&view=`;

    Linking.openURL(url);
  };
  const { submit: likeSubmit, isLoading: likeLoading } = useCreateLikePost();
    
  const horizontalPadding = 40
  const sliderWidth = width - horizontalPadding;  
  return(
    <SafeScreen changeBackgroundColor="white">
      <LinearGradient
        colors={[colors.blue, "#FFFFFF"]} // ← 上: 青 (#009DFF)、下: 白 (#FFFFFF)
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
        className="z-10 bg-primary border-b border-borderColor px-[20px] pb-4 gap-3"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          paddingTop: Math.max(insets.top, 20),
          paddingHorizontal: 20, // ← px-[20px] の代わり
          paddingBottom: 24,     // ← pb-6 の代わり (6*4=24)
          gap: 12,
          zIndex: 10,
        }}
      >
        <TouchableOpacity
          className="bg-white flex-row items-center gap-2 py-2 mt-3 rounded-xl w-auto self-start px-3"
          onPress={() => router.back()}
        >
          <arrows.ArrowLeftIcon size={18} color={colors.primary} />
          <Text className="text-primary font-medium">戻る</Text>
        </TouchableOpacity>
      </LinearGradient>
      <ScrollView
        className="mt-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: Math.max(headerHeight - insets.top + 20, 0),
          paddingBottom: Math.max(footerHeight - insets.bottom + 20, 0),
        }}
      >
        {!post ? <View className="justify-center items-center"><Text className="text-black">Loading...</Text></View> : (
          <>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              className="mt-3"
              onScroll={(e) => {
                const x = e.nativeEvent.contentOffset.x;
                const index = Math.round(x / sliderWidth);
                setCurrentIndex(index);
              }}
              scrollEventThrottle={16}
            >
              {post.imagesUrl.map((url, index) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => {setSelectedImage(url), setIsOpenImageModal(true)} }>
                  <View style={{ width: sliderWidth }}>
                    <Image
                      source={{ uri: url }}
                      className="w-full mt-3 rounded-2xl"
                      style={{ height: 200 }}
                      resizeMode="contain"
                    
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View className="flex-row justify-center mt-3">
              {post.imagesUrl.map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginHorizontal: 4,
                    backgroundColor:
                      index === currentIndex ? colors.primary : "#ccc",
                  }}
                />
              ))}
            </View>
            <View 
              className="bg-white border border-borderColor px-4 py-5 rounded-2xl mt-3"
            >
              <View className="flex-row items-center gap-3">
                <View className="flex-row items-center justify-center gap-2 bg-bgIcon rounded-full w-10 h-10">
                  <categories.ClothesIcon size={20} color={colors.primaryLight} />
                </View>
                <View>
                  <Text className="text-black">{post.postedBy}</Text>
                  <Text className="text-xs text-blackLight">{post.cityName}</Text>            
                </View>
              </View>
              <Text className="text-black mt-3">{post.message}</Text>
              <View className="flex-row justify-between items-center border-t border-borderColor mt-5 pb-3">
                <TouchableOpacity 
                  onPress={() => handleLikeSubmit(post.id)}
                  className={`${
                    post.isLiked ? "bg-subLight" : "bg-grayLight"
                  } rounded-xl flex-row items-center gap-3 px-5 py-3 mt-3 min-w-0 border border-borderColor`}
                >
                  <GoodIcon size={16} color={post.isLiked ? colors.mapIconBlue : colors.primaryLight} filled={post.isLiked}/>
                  <Text 
                    className={`${post.isLiked ? "text-mapIconBlue font-bold" : "text-primaryLight"} text-sm`}
                  >
                    参考になった数 {post.likeCount}
                  </Text>
                </TouchableOpacity>
                <Text className="text-xs text-secondary">{timeAgo(post.createdAt)}</Text>
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
                      <Text className="text-black py-2 font-bold">{post.temperature}℃</Text>
                      <Text className="text-blackLight text-xs"></Text>
                    </View>
                  </View>
                  {/* 右上 */}
                  <View className="w-1/2 pl-1">
                    <View className="bg-white border border-borderColor px-4 py-5 rounded-2xl">
                      <View className="flex-row items-center gap-2">
                        <weathers.PrecipitationProbabilityIcon size={18} color={colors.primaryLight} />
                        <Text className="text-xs text-primaryLight">降水量</Text>
                      </View>
                      <Text className="text-black py-2 font-bold">{post.precipitationProb}mm/h</Text>
                      <Text className="text-blackLight text-xs"></Text>
                    </View>
                  </View>

                  {/* 左下 */}
                  <View className="w-1/2 pr-1">
                    <View className="bg-white border border-borderColor px-4 py-5 rounded-2xl">
                      <View className="flex-row items-center gap-2">
                        <weathers.WindSpeedIcon size={18} color={colors.primaryLight} />
                        <Text className="text-xs text-primaryLight">風速</Text>
                      </View>
                      <Text className="text-black py-2 font-bold">{post.windSpeed}m/s</Text>
                      <Text className="text-blackLight text-xs">{post.windDirection}の風</Text>
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
          </>
          )}
      </ScrollView>
      <Footer setFooterHeight={setFooterHeight} />
      <ImageModal imageUrl={selectedImage} isOpen={isOpenImageModal} setIsOpen={setIsOpenImageModal} />
    </SafeScreen>
  )
}