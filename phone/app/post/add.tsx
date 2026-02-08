import { Footer } from "@/components/footer";
import { ImageAddIcon, categories, locations } from "@/components/icons";
import SafeScreen from "@/components/safe-screen";
import { ShowImageModal } from "@/components/show-image-modal";
import { colors } from "@/lib/colors";
import { useCreatePost } from "@/lib/hooks/usePost";
import { useLocationStore } from "@/store/useCurrentGet";
import { useUserStore } from "@/store/useUserStore";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function AddScreen() { 
  
  const { submit, isLoading } = useCreatePost();
  const latitude = useLocationStore((state) => state.latitude);
  const longitude = useLocationStore((state) => state.longitude);
  const handleSubmit = async () => {
    const cityId = await SecureStore.getItemAsync("user_city");
    await submit({
      categoryId: selectedCategory,
      message,
      images,
      cityId: Number(cityId),
      latitude: latitude!,
      longitude: longitude!,
    });

    router.back(); // 例：投稿後に戻る
  };
  
  const insets = useSafeAreaInsets();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [municipalities, setMunicipalities] = useState("");
  const isPostEnabled =
  !isLoading && selectedCategory !== 0 && message.trim().length > 0;

  
  const cards = [
    {
      id: 1,
      name: "傘・雨",
      style: "pr-2 pb-2",
      icon: categories.RainIcon
    },
    {
      id: 2,
      name: "服装",
      style: "pl-2 pb-2",
      icon: categories.ClothesIcon
    },
    {
      id: 3,
      name: "移動",
      style: "pr-2 pt-2",
      icon: categories.MoveIcon
    },
    {
      id: 4,
      name: "外での活動",
      style: "pl-2 pt-2",
      icon: categories.SunIcon
    },
  ]

  const pickImages = async () => {
    const remaining = 4 - images.length;
    if (remaining <= 0) return;
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],    
      allowsMultipleSelection: true,
      selectionLimit: remaining,
      quality: 1,
    });
  
    if (!result.canceled) {
      const uris = result.assets.map(asset => asset.uri);
      setImages(prev => [...prev, ...uris]);
    }
  };
  const user = useUserStore((state) => state.user); 
  useEffect(() => {
    if (!user) {
      Toast.show({
        type: "error",
        text1: "この機能を利用するにはログインが必須です。",
      });
      router.push("/auth");
    } else {
      setMunicipalities(user.cityName);
      console.log(user.cityName)
    }
  }, [user]);

  if (!user) {
    return null; // 何も描画しない
  }
  
  return (
    <>
      <SafeScreen changeBackgroundColor="white">
        <View 
          onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
          className="gap-2 bg-white border-b border-borderColor px-[20px] pb-6 z-10"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            paddingTop: Math.max(insets.top, 20),
          }}
        >
          <Text className="text-black text-2xl font-bold mt-3">今の状況を共有</Text>
          <Text className="text-primaryLight text-sm">今の行動・判断を共有してください</Text>
        </View>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingTop: Math.max(headerHeight - insets.top, 0),
              paddingBottom: Math.max(footerHeight - insets.bottom + 20, 0),
            }}
          >  
            <Text className="text-sm text-primary mt-5">カテゴリを選択</Text>
            <View className="flex-row flex-wrap mt-4">
              {cards.map((category) => {
                const isSelected = selectedCategory === category.id;
                return (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => setSelectedCategory(category.id)}
                    className={`w-1/2 ${category.style}`}
                  >
                    <View
                      className={`justify-center items-center gap-2 rounded-2xl py-5 border ${
                        isSelected
                          ? "bg-primary border-primary"
                          : "bg-white border-borderColor"
                      }`}
                    >
                      <category.icon
                        size={30}
                        color={isSelected ? "white" : colors.primary}
                      />
                      <Text
                        className={`text-sm ${
                          isSelected ? "text-white" : "text-primary"
                        }`}
                      >
                        {category.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text className="text-sm text-primary mt-5">メッセージ</Text>
            <TextInput
              className="bg-white rounded-2xl p-4 mt-4 h-36 border border-borderColor"
              placeholder="例：薄手のパーカーでちょうど良かった"
              placeholderTextColor={colors.textPlaceholder}
              value={message}
              onChangeText={setMessage}
              multiline={true}                   
              textAlignVertical="top"
              numberOfLines={6}   
            />
            <TouchableOpacity
              onPress={pickImages}
              disabled={images.length >= 4}
              className={`flex justify-center gap-3 items-center rounded-2xl py-8 mt-6 border-2
                ${images.length >= 4 ? "border-borderColor opacity-40" : "border-borderColor"}
              `}
            >
              <ImageAddIcon size={24} color={colors.primaryLight} />
              <Text className="text-primaryLight text-sm">
                画像を追加する（任意）<Text className="font-bold">{images.length}/4</Text>
              </Text>
            </TouchableOpacity>
            {images.length > 0 && (
              <View className="flex-row flex-wrap mt-4 gap-4 pl-1">
                {images.map((uri) => (
                  <TouchableOpacity
                    key={uri}
                    onPress={() => setPreviewImage(uri)}
                  >
                    <Image
                      source={{ uri }}
                      className="w-20 h-20 rounded-xl"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <View className="flex-row gap-3 justify-start items-center  bg-subLight rounded-2xl p-4 mt-8 border border-borderSubColor">
              <locations.LocationIcon size={20} color={colors.mapIconBlue} />
              <Text className="text-sub text-sm">投稿は <Text className="font-bold">{municipalities}エリア</Text> として共有されます</Text>
            </View>
            <TouchableOpacity 
              disabled={!isPostEnabled}
              className={`flex justify-center items-center rounded-2xl py-6 mt-8
                ${isPostEnabled ? "bg-primary opacity-100" : "bg-primary opacity-40"}
              `}
              onPress={handleSubmit}
            >
              <Text className="text-white font-bold">{isLoading ? "投稿中..." : "投稿する"}</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
        <Footer setFooterHeight={setFooterHeight}/>
      </SafeScreen>
      <ShowImageModal
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        setImages={setImages}
      />
    </>
  );
}
