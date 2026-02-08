import { forms } from "@/components/icons/";
import { colors } from "@/lib/colors";
import { useLogin, useRegister } from "@/lib/hooks/useAuth";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export function FormCard() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const buttons = [
    { id: "login" as const, label: "ログイン" },
    { id: "register" as const, label: "新規登録" },
  ];
  const { submit: loginSubmit, isLoading: loginIsLoading } = useLogin();
  const { submit: registerSubmit, isLoading: registerIsLoading } = useRegister();
  const handleSubmit = () => {
    if (activeTab === "login") {
      loginSubmit({
        email,
        password,
      })
    } else {
      registerSubmit({
        name,
        email,
        password,
      })
    }
  };

  const goHome = async () => {
    const id = await SecureStore.getItemAsync("user_city");
    if (!id) return; // ない場合のガード
    router.push(`/post?city_id=${id}`);
  };
  
  return (
    <View className="w-full justify-center items-center">
    <View className="bg-white/10 rounded-2xl w-full p-6">
      <View className="flex-row bg-white/10 rounded-2xl p-2">
        {buttons.map((button) => (
          <TouchableOpacity
            key={button.id}
            className={`flex-1 p-3 rounded-xl mx-1 ${
              activeTab === button.id ? "bg-white" : "bg-white/0"
            }`}
            onPress={() => setActiveTab(button.id)}
          >
            <Text
              className={`text-center font-bold text-base ${
                activeTab === button.id ? "text-primary" : "text-white/70"
              }`}
            >
              {button.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="mt-6">
        {activeTab !== "login" && (
          <View>
            <Text className="text-white text-sm mb-1">ニックネーム</Text>
            <View className="flex-row items-center gap-2 mb-3 bg-white rounded-md px-3">
              <forms.UserIcon size={18} color={colors.textPlaceholder} />
              <TextInput
                className="flex-1"
                placeholder="田中太郎"
                placeholderTextColor={colors.textPlaceholder}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>
        )}
        <Text className="text-white text-sm mb-1">メールアドレス</Text>
        <View className="flex-row items-center gap-2 mb-3 bg-white rounded-md px-3">
          <forms.MailIcon size={18} color={colors.textPlaceholder} />
          <TextInput
            className="flex-1"
            placeholder="email@example.com"
            placeholderTextColor={colors.textPlaceholder}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Text className="text-white text-sm mb-1">パスワード</Text>
        <View className="flex-row items-center gap-2 mb-3 bg-white rounded-md px-3">
          <forms.PasswordIcon size={18} color={colors.textPlaceholder} />
          <TextInput
            className="flex-1"
            secureTextEntry
            placeholder="password"
            placeholderTextColor={colors.textPlaceholder}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity 
          disabled={loginIsLoading || registerIsLoading}
          className="bg-white rounded-md py-3"
          onPress={handleSubmit}
        >
          <Text className="text-center font-bold text-primaryLight">  
            {activeTab === "login" ? "ログイン" : "アカウント作成"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
      {activeTab === "login" ? (
        <TouchableOpacity 
          onPress={goHome} 
          className="mt-4 underline decoration-2 underline-offset-4 decoration-white/50 text-white/70 hover:decoration-white"
        >
          <Text className="text-white/70 text-sm">ゲストとして続ける</Text>
        </TouchableOpacity>
        ) : (
          <View className="justify-center items-center mt-4 gap-1">
            <Text className="text-white/50 text-xs">登録することで利用規約とプライバシーポリシーに</Text>
            <Text className="text-white/50 text-xs">同意したものとみなします</Text>
          </View>
        )
      }
    </View>
  );
}
