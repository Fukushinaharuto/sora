import { Category } from "@/app/post";
import { colors } from "@/lib/colors";
import {
  Modal,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { CancelIcon, CheckIcon } from "./icons";

type Props = {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  onSelect: (key: Category["key"]) => void;
  selected: Category["key"];
  categoryList: Category[];
};

export function CategoryFilterModal({ isOpen, onClose, onSelect, selected, categoryList }: Props) {
  
  return (
    <Modal 
      transparent 
      visible={isOpen} 
      animationType="fade"
      onRequestClose={() => onClose(false)}
    >
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "flex-end" }}
        activeOpacity={1}
        onPress={() =>onClose(false)}
      >
        <TouchableOpacity activeOpacity={1}>
          <View className="bg-white w-full py-6 rounded-t-2xl border-b border-bgIcon">
            <View className="flex-row items-center justify-between gap-3 px-5">      
              <Text className="text-black font-bold text-lg">
                助け要請を送信
              </Text>               
              <View>
                <TouchableOpacity onPress={() => onClose(false)}>
                  <CancelIcon size={20} color={colors.primaryLight} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="bg-white p-4 gap-3">
          {categoryList.map(cat => {
            const isSelected = selected === cat.key;

            return (
              <TouchableOpacity
                key={cat.key}
                className={`py-4 px-3 rounded-2xl ${
                  isSelected ? "bg-primary" : "bg-grayLight"
                }`}
                onPress={() => {
                  onSelect(cat.key);
                  onClose(false);
                }}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3">
                    <View className={` rounded-full h-10 w-10 items-center justify-center
                      ${
                        isSelected ? "bg-white/20" : "bg-white"
                      }
                      `}
                    >
                      <cat.icon size={20} color={isSelected ? "white" : colors.primary} />
                    </View>
                    <View>
                      <Text className={`font-bold
                        ${
                          isSelected ? "text-white" : "text-black"
                        }
                        `}
                      >{cat.label}</Text>
                      {cat.key !== "all" && (
                        <Text className={`text-xs
                          ${
                            isSelected ? "text-white" : "text-blackLight"
                            }
                          `}
                        >{cat.discription}</Text>
                      )}
                    </View>
                  </View>
                  {isSelected && (
                    <CheckIcon size={20} color={isSelected ? "white" : colors.primary} />
                  )}
                  
                </View>
              </TouchableOpacity>
            );
          })}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
