import { Footer } from "@/components/footer";
import { badges, profiles } from "@/components/icons";
import { colors } from "@/lib/colors";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function Index() {
  const insets = useSafeAreaInsets();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [titles, setTitles] = useState([
    {
      id: "1",
      hasTitle: true,
      name: "初投稿",
      style: "pr-2 pb-2",
      icon: badges.FastPostIcon
    },
    {
      id: "2",
      hasTitle: false,
      name: "雨の達人",
      style: "pb-2",
      icon: badges.FastPostIcon
    },
    {
      id: "3",
      hasTitle: true,
      name: "ファッション通",
      style: "pl-2 pb-2",
      icon: badges.FastPostIcon
    },
    {
      id: "4",
      hasTitle: true,
      name: "的確アドバイザー",
      style: "pr-2 pt-2",
      icon: badges.FastPostIcon
    },
    {
      id: "5",
      hasTitle: true,
      name: "エリアの声",
      style: "pt-2",
      icon: badges.FastPostIcon
    },
    {
      id: "6",
      hasTitle: true,
      name: "100回投稿",
      style: "pl-2 pt-2",
      icon: badges.FastPostIcon
    },
    
  ]);
  
  return (
    <View className="flex-1 bg-grayLight"> 
      <ScrollView 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
      <View 
        onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
        className="gap-1 bg-primary border-b border-borderColor px-[20px] pb-14 z-10"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          paddingTop: Math.max(insets.top, 20),
        }}
      >
        <View className="mt-4">
          <Text className="text-white text-2xl font-bold">プロフィール</Text>
        </View>
        <View className="justify-center items-center gap-2">
          <Image source={require('@/assets/images/icon.png')} className="w-20 h-20 rounded-full" />
          <Text className="text-white text-lg font-bold">ユーザー名</Text>
          <Text className="text-white/80 text-sm">渋谷・原宿エリア</Text>
          <TouchableOpacity className="flex-row items-center py-2 self-center">
            <Text className="text-white/90 leading-tight border-b border-borderColor">地域を変更</Text>
          </TouchableOpacity>
        </View>
      </View>
        <View
          className="flex-1"
          style={{
            paddingTop: Math.max(headerHeight - insets.top, 0),
            paddingBottom: Math.max(footerHeight - insets.bottom + 20, 0),
            paddingLeft: 20,
            paddingRight: 20,
            zIndex: 30
          }}
        >  
          <View className="bg-white rounded-2xl flex-row justify-between items-center p-2 py-4 border border-borderColor shadow-[0_1px_3px_0px_rgba(0,0,0,0.1)]">
            <View className="flex-1 gap-2 items-center">
              <profiles.PostIcon size={18} color={colors.primary} />
              <Text className="text-black">23</Text>
              <Text className="text-xs text-blackLight">投稿数</Text>
            </View>
            <View className="flex-1 gap-2 items-center">
              <profiles.LikeIcon size={18} color={colors.primary} />
              <Text className="text-black">153</Text>
              <Text className="text-xs text-blackLight">参考になった数</Text>
            </View>
            <View className="flex-1 gap-2 items-center">
              <profiles.LocationIcon size={18} color={colors.primary} />
              <Text className="text-black">23</Text>
              <Text className="text-xs text-blackLight">アクティブ日数</Text>
            </View>
          </View>
          <View className="bg-white p-4 mt-4 rounded-2xl border border-borderColor">
            <View className="flex-row justify-between items-center">
              <Text className="text-black font-bold text-lg">獲得バッジ</Text>
              <Text className="text-blackLight text-sm">3/6</Text>
            </View>
            <View className="flex-row flex-wrap mt-3">
              {titles.map((title) => {
                
                return (
                  <View
                    key={title.id}
                    className={`w-1/3 ${title.style}`}
                  >
                    <View
                      className={`h-36 justify-center items-center gap-2 bg-grayLight rounded-2xl px-2 border border-borderColor ${
                        !title.hasTitle
                          && "opacity-40"
                      }`}
                    >
                      <badges.FastPostIcon
                        size={30}
                        color={colors.primary}
                      />
                      <Text
                        className="text-sm text-primary text-center"
                      >
                        {title.name}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          <View className="bg-white p-4 mt-4 rounded-2xl border border-borderColor">
            <Text className="text-black font-bold text-lg">最近のアクティブ</Text>
            <View className="gap-2 my-2">
              <View className="gap-2 py-4 border-b border-borderColor">
                <View className="flex-row items-center justify-between">
                  <Text className="text-black font-bold">今日</Text>
                  <Text className="text-mapIconBlue font-bold">+3</Text>
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="text-xs text-blackLight font-bold">2件投稿</Text>
                  <Text className="text-xs text-blackLight font-bold">参考になった</Text>
                </View>
              </View>
              <View className="gap-2 py-4 border-b border-borderColor">
                <View className="flex-row items-center justify-between">
                  <Text className="text-black font-bold">今日</Text>
                  <Text className="text-mapIconBlue font-bold">+3</Text>
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="text-xs text-blackLight font-bold">2件投稿</Text>
                  <Text className="text-xs text-blackLight font-bold">参考になった</Text>
                </View>
              </View>
              <View className="gap-2 py-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-black font-bold">今日</Text>
                  <Text className="text-mapIconBlue font-bold">+3</Text>
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="text-xs text-blackLight font-bold">2件投稿</Text>
                  <Text className="text-xs text-blackLight font-bold">参考になった</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer setFooterHeight={setFooterHeight}/>
      </View>
  );
}
