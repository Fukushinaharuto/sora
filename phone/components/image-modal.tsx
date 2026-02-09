import {
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";

type Props = {
  imageUrl: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export function ImageModal({ imageUrl, isOpen, setIsOpen }: Props) {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={() => setIsOpen(false)}
    >
      <View style={{ flex: 1 }}>
        {/* 黒背景（キーボードの影響を一切受けない） */}
        <TouchableOpacity
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: "rgba(0,0,0,0.8)" },
          ]}
          onPress={() => setIsOpen(false)}
        >
          <View 
            style={{ 
              flex: 1,
              padding: 40
            }}
          >
          <Image
            source={{ uri: imageUrl }}
            style={{ flex: 1 }}
            resizeMode="contain"
          />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
