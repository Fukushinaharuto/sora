
import { CategoryFilterModal } from "@/components/category-filter-modal";
import { Footer } from "@/components/footer";
import { HelpModal } from "@/components/help-modal";
import { GoodIcon, LogoIcon, NarrowDownIcon, categories, helps, locations } from "@/components/icons";
import SafeScreen from "@/components/safe-screen";
import { colors } from "@/lib/colors";
import { useCreateLikePost, useIndexPost } from "@/lib/hooks/usePost";
import { changeWatherType } from "@/lib/utils/change-wather-type";
import { timeAgo } from "@/lib/utils/timeAgo";
import { useUserStore } from "@/store/useUserStore";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export type Category = {
  key: "all" | "rain" | "clothes" | "move" | "sun";
  id: number;
  label: string;
  discription?: string;
  icon: React.FC<{ size: number; color: string }>;
};
export default function Index() {
  const user = useUserStore((state) => state.user);
  const { city_id } = useLocalSearchParams<{ city_id: string }>();
  const insets = useSafeAreaInsets();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [isOpenHelpModal, setIsOpenHelpModal] = useState(false);
  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "rain" | "clothes" | "move" | "sun">("all");
  const categoryList: Category[] = [
    { key: "all", id: 0, label: "すべて", icon: NarrowDownIcon},
    { key: "rain", id: 1, label: "傘・雨", discription: "傘や雨具の情報", icon: categories.RainIcon },
    { key: "clothes",id: 2, label: "服装", discription: "今日の服装の参考に", icon: categories.ClothesIcon },
    { key: "move", id: 3,  label: "移動", discription: "交通・混雑状況", icon: categories.MoveIcon },
    { key: "sun", id: 4, label: "外での活動", discription: "外での活動情報", icon: categories.SunIcon },
    
  ];
  const categoryId = categoryList.find(cat => cat.key === selectedCategory)?.id ?? 0;

  const { posts, cityName, weatherType, maxTemperature, minTemperature, isLoading: indexPostIsLoading } = useIndexPost(Number(city_id), categoryId);
  const { submit: likeSubmit, isLoading: likeLoading } = useCreateLikePost();

  const handleCategoryChange = (key: Category["key"]) => {
    setSelectedCategory(key);
    setIsOpenCategoryModal(false);
  };

  const renderCategoryIcon = (categoryId: number) => {
    switch (categoryId) {
      case 1:
        return <categories.RainIcon size={20} color={colors.primaryLight} />;
      case 2:
        return <categories.ClothesIcon size={20} color={colors.primaryLight} />;
      case 3:
        return <categories.MoveIcon size={20} color={colors.primaryLight} />;
      case 4:
        return <categories.SunIcon size={20} color={colors.primaryLight} />;
      default:
        return <NarrowDownIcon size={20} color={colors.primaryLight} />;
    }
  }
  const handleHelpIsOpen = () => {
    if (user){
      setIsOpenHelpModal(true);
    } else {
      Toast.show({
        type: "error",
        text1: "この機能を利用するにはログインが必須です。",
      })
      router.push("/auth")
    }
    
  }
  console.log(cityName)
  return (
    <>
      <SafeScreen changeBackgroundColor="white">
        <View 
          onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
          className="z-10 bg-white border-b border-borderColor px-[20px] pb-4 gap-3"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            paddingTop: Math.max(insets.top, 20),
          }}
        >
          <TouchableOpacity 
            onPress={() => router.push("/location")}
            className="flex-row items-center gap-2 mt-3"
          >
            <locations.LocationIcon size={20} color={colors.primaryLight} />
            <Text className="text-black">{cityName}・エリア</Text>
          </TouchableOpacity>
          <View className="flex-row items-center gap-3 bg-grayLight rounded-xl px-5 py-3">
            <LogoIcon size={24} color={colors.primary} />
            <View>
              <Text className="text-black text-sm">今日の天気・{changeWatherType(weatherType)}</Text>
              <Text className="text-blackLight text-xs">最高 {maxTemperature}°C / 最低 {minTemperature}°C</Text>
            </View>
          </View>
        </View>
        <View 
          className="flex-1"
          style={{
            paddingTop: Math.max(headerHeight - insets.top + 20, 10),
          }}
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-balck text-xl font-bold">みんなの行動</Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-blackLight text-xs">カテゴリ</Text>
              <TouchableOpacity 
                className="flex-row items-center gap-1 bg-primary rounded-xl px-3 py-2"
                onPress={() => {setIsOpenCategoryModal(true)}}
              >
                <NarrowDownIcon size={14} color="white" />
                <Text className="text-sm text-white font-bold">
                  {categoryList.find(cat => cat.key === selectedCategory)?.label}
                </Text>
              </TouchableOpacity>
            </View>
            
          </View>
          <ScrollView
            className="mt-3"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: Math.max(footerHeight - insets.bottom + 20, 0),
            }}
          >
            {indexPostIsLoading ? (
              <Text className="text-center mt-4">読み込み中...</Text>
            ) : (
              <View className="gap-2">
                
                {posts.map((post) => (
                  <TouchableOpacity 
                    onPress={() => router.push(`/post/${post.id}`)}
                    key={post.id} 
                    className="bg-white border border-borderColor px-4 py-5 rounded-2xl"
                  >
                    <View className="flex-row items-center gap-3">
                      <View className="flex-row items-center justify-center gap-2 bg-bgIcon rounded-full w-10 h-10">
                        {renderCategoryIcon(post.categoryId)}
                      </View>
                      <View>
                        <Text className="text-black">{post.postedBy}</Text>
                        <Text className="text-xs text-blackLight">{cityName}・{timeAgo(post.createdAt)}</Text>            
                      </View>
                    </View>
                    <Text className="text-black mt-3">{post.message}</Text>
                    {post.imageUrl && (
                      <Image 
                        source={{ uri: post.imageUrl }}
                        className="w-full h-40 rounded-2xl mt-3" 
                      />
                    )}
                    <View className="bg-grayLight rounded-lg flex-row items-center gap-3 px-3 py-2 mt-3">
                      <LogoIcon size={14} color={colors.primary} />
                      <Text className="text-primaryLight text-xs">{changeWatherType(post.weatherType)} {post.temperature}℃</Text>
                    </View>
                    <View className="flex-row justify-start items-center">
                      <TouchableOpacity 
                        onPress={() =>
                          likeSubmit({
                            postId: post.id,
                          })
                        }
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
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>
          </View>
        <Footer setFooterHeight={setFooterHeight} />
      </SafeScreen>
      <View
        style={{
          position: "absolute",
          right: 8,
          bottom: Math.max(footerHeight - insets.bottom + 40, 20),
          alignItems: "flex-end",
          zIndex: 50,
        }}
      >
        <View className="gap-4">
        <TouchableOpacity
          className="justify-center items-center"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.1,
            shadowRadius: 15,
            elevation: 8,
            backgroundColor: "transparent",
            borderRadius: 999,
          }}
          onPress={handleHelpIsOpen}
        >
          <helps.CaveatIcon size={60} color={colors.red} />
        </TouchableOpacity>


        <TouchableOpacity
          className="justify-center items-center"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 }, 
            shadowOpacity: 0.1,
            shadowRadius: 15,
            elevation: 8,
            backgroundColor: "transparent",
            borderRadius: 999,
          }}
          onPress={() => router.push(`/help?city_id=${city_id}`)}
        >
          <helps.NotificationIcon size={55} color={colors.primary} />
        </TouchableOpacity>

        </View>
      </View>
      <CategoryFilterModal
        isOpen={isOpenCategoryModal}
        onClose={() => setIsOpenCategoryModal(false)}
        selected={selectedCategory}
        onSelect={(key) => {
          handleCategoryChange(key)
        }}
        categoryList={categoryList}
      />
      {user && (
        <HelpModal
          isOpen={isOpenHelpModal}
          setIsOpen={setIsOpenHelpModal}
          city_id={city_id}
          userStatus={user.status}
        />
      )}

    </>
  );
}
