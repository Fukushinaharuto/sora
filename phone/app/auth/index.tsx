import { FormCard } from "@/components/form-card";
import SafeScreen from "@/components/safe-screen";
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";

export default function Index() {
  return (
    <SafeScreen changeBackgroundColor="darkBlue">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
        <View className="flex-1 justify-center items-center">
        <Image 
          source={require('@/assets/images/public/logo.png')} 
          className="w-40 h-40"
          style={{ resizeMode: 'contain' }} 
        />
          <Text className="text-white text-3xl mt-6 font-bold">
            行動で見る天気
          </Text>
          <Text className="text-white/80 my-6">
            地域のリアルな情報を共有しよう
          </Text>
          <FormCard />
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
}

