import { CancelIcon, helps } from "@/components/icons";
import { colors } from "@/lib/colors";
import { useCreateHelp, useUpdateHelped } from "@/lib/hooks/useHelp";
import { getCurrentLocation } from "@/lib/utils/get-current-location";
import { useUserStore } from "@/store/useUserStore";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  city_id: string
  userStatus: boolean;
};

export function HelpModal({ isOpen, setIsOpen, city_id, userStatus }: Props) {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);
  const { submit: helpSubmit, isLoading: helpLoading } = useCreateHelp();
  const { submit: helpedSubmit, isLoading: helpedLoading } = useUpdateHelped();
  const handleHelpSubmit = async () => {
    setIsLoading(true);
    Keyboard.dismiss();
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
    const g = geocode[0];
    const address = [
      g.region,
      g.city,
      g.subregion,
      g.street,
      g.name,
    ].filter(Boolean).join("");
  
    helpSubmit({
      message: message,
      city_id: Number(city_id),
      address: address,
      latitude: latitude,
      longitude: longitude,
    })
    setIsLoading(false);
  }

  const handleBackdropPress = () => {
    if (isKeyboardVisible) {
      Keyboard.dismiss(); // まずキーボードだけ閉じる
    } else {
      setIsOpen(false); // キーボード出てなければモーダル閉じる
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
    }
  }, [user]);

  if (!user) {
    return null; // 何も描画しない
  }

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={() => setIsOpen(false)}
    >
      <View style={{ flex: 1 }}>
        {/* 黒背景（キーボードの影響を一切受けない） */}
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: "rgba(0,0,0,0.8)" },
          ]}
        >
          <Toast/>
        </View>
        {helpLoading || isLoading && (
          <View
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: "rgba(0,0,0,0.3)",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 999,
              },
            ]}
            pointerEvents="auto"
          >
            <View className="bg-white px-6 py-4 rounded-xl">
              <Text className="text-black font-bold">送信中...</Text>
            </View>
          </View>
        )}
    
        {/* 背景タップ検知 */}
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          activeOpacity={1}
          onPress={handleBackdropPress}
        />
    
        {/* ここだけキーボード回避 */}
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableOpacity activeOpacity={1}>
          <View className="bg-white w-full py-5 rounded-xl">
          <View className="flex-row items-center justify-between gap-3 px-5">
            <View className="flex-row items-center gap-3">
              <helps.CaveatIcon size={40} color={colors.red} />
              <Text className="text-black font-bold text-lg">
                {!userStatus ? "助け要請を送信" : "助け要請を取り消す"}
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <CancelIcon size={20} color={colors.primaryLight} />
              </TouchableOpacity>
            </View>
          </View>
          {/* userStatusによる表示切替 */}
          {userStatus ? (
            // userStatusがtrueの場合に表示する内容
            <View className="mt-5 px-5">
              <Text className="text-lg font-bold text-green-600 text-center">
                すでに助け要請中です
              </Text>
              <TouchableOpacity
                className="mt-3 py-4 rounded-2xl bg-red h-24 justify-center items-center"
                onPress={() => helpedSubmit(Number(city_id))}
              >
                <Text className="text-white font-bold text-center text-sm">
                  救出成功
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            // userStatusがfalseの場合に表示するフォーム
            <>
              <View className="mt-5 px-5 border-t border-borderColor">
                <View className="mt-3">
                  <Text className="text-sm text-primaryLight">
                    あなたの現在地と助け要請が周囲の人に共有されます。
                  </Text>
                </View>

                <View className="mt-3">
                  <Text>理由や状況（任意）</Text>
                  <TextInput
                    className="bg-grayLight rounded-2xl p-4 mt-4 h-32 border border-borderColor"
                    placeholder="例：停電で困っています、怪我をしています..."
                    placeholderTextColor={colors.textPlaceholder}
                    value={message}
                    onChangeText={(message) => setMessage(message)}
                    multiline
                    textAlignVertical="top"
                    numberOfLines={6}
                  />
                </View>
              </View>

              <View className="justify-end items-end mt-3">
                <Text className="text-xs text-blackLight"></Text>
              </View>

              <TouchableOpacity
                className="mx-5 py-4 rounded-2xl bg-red mt-3"
                onPress={handleHelpSubmit}
                disabled={helpLoading}
              >
                <Text className="text-white font-bold text-center text-sm">
                  助け要請を送信する
                </Text>
              </TouchableOpacity>
            </>
          )}
          </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
