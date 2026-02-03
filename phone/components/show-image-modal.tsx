import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

type Props = {
  previewImage: string | null;
  setPreviewImage: (value: string | null) => void;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
};

export function ShowImageModal({ previewImage, setPreviewImage, setImages }: Props) {
  return (
      <Modal
        visible={!!previewImage}
        transparent
        animationType="fade"
        onRequestClose={() => setPreviewImage(null)}
      >
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.8)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setPreviewImage(null)}
        >
          <Image
            source={{ uri: previewImage! }}
            className="w-[90%] h-[70%]"
            resizeMode="contain"
          />

          <TouchableOpacity
            onPress={() => {
              setImages(prev => prev.filter(img => img !== previewImage));
              setPreviewImage(null);
            }}
            className="mt-6 px-6 py-3 bg-red rounded-xl"
          >
            <Text className="text-white font-bold">
              削除する
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}