import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";

export default function FormCard() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const buttons = [
    { id: "login" as const, label: "ログイン" },
    { id: "register" as const, label: "新規登録" },
  ];
  const colors = {textPlaceholder: "#90A1B9"};
  const handleLogin = () => {
    console.log(password, email, name);
  }
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
          <TextInput
            className="bg-white rounded-md px-3 py-2 mb-3"
            placeholder="田中太郎"
            placeholderTextColor="#90A1B9"
            value={name}
            onChangeText={setName}
          />
          </View>
        )}
        <Text className="text-white text-sm mb-1">メールアドレス</Text>
        <TextInput
          className="bg-white rounded-md px-3 py-2 mb-3"
          placeholder="email@example.com"
          placeholderTextColor={colors.textPlaceholder}
          value={email}
          onChangeText={setEmail}
        />

        <Text className="text-white text-sm mb-1">パスワード</Text>
        <TextInput
          className="bg-white rounded-md px-3 py-2 mb-4"
          secureTextEntry
          placeholder="password"
          placeholderTextColor={colors.textPlaceholder}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity className="bg-white rounded-md py-3">
          <Text 
            className="text-center font-bold text-primaryLight"
            onPress={() => handleLogin()}
          >  
            {activeTab === "login" ? "ログイン" : "アカウント作成"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
      {activeTab === "login" ? (
        <Link 
          href="/" 
          className="mt-4 underline decoration-2 underline-offset-4 decoration-white/50 text-white/70 hover:decoration-white"
        >
          <Text className="text-white/70 text-sm">ゲストとして続ける</Text>
        </Link>
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
