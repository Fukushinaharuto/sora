import { CancelIcon, helps } from "@/components/icons";
import { colors } from "@/lib/colors";
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

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export function HelpModal({ isOpen, setIsOpen }: Props) {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

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

  const handleBackdropPress = () => {
    if (isKeyboardVisible) {
      Keyboard.dismiss(); // まずキーボードだけ閉じる
    } else {
      setIsOpen(false); // キーボード出てなければモーダル閉じる
    }
  };

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
        />
    
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
                    助け要請を送信
                  </Text>
                </View>
                <View>
                  <TouchableOpacity onPress={() => setIsOpen(false)}>
                    <CancelIcon size={20} color={colors.primaryLight} />
                  </TouchableOpacity>
                </View>
              </View>
    
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
                    value={""}
                    onChangeText={() => {}}
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
                onPress={() => setIsOpen(false)}
              >
                <Text className="text-white font-bold text-center text-sm">
                  助け要請を送信する
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
