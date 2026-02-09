import { api } from "@/lib/api/api";
import * as FileSystemLegacy from 'expo-file-system/legacy';
import * as ImageManipulator from 'expo-image-manipulator';

export type CreatePostRequest = {
  categoryId: number,
  message: string,
  images: string[],
  cityId: number,
  latitude: number,
  longitude: number
};

type RNFile = {
  uri: string;
  name: string;
  type: string;
};

// 画像を圧縮する関数
async function compressImage(uri: string, index: number): Promise<RNFile> {
  try {
    // ファイル情報を取得（レガシーAPI使用）
    const fileInfo = await FileSystemLegacy.getInfoAsync(uri);
    
    if (!fileInfo.exists) {
      throw new Error(`画像ファイルが見つかりません (${index})`);
    }

    // 型ガード: sizeプロパティが存在するかチェック
    if (!('size' in fileInfo)) {
      throw new Error(`ファイルサイズを取得できません (${index})`);
    }

    const fileSizeMB = fileInfo.size / 1024 / 1024;
    const maxSizeMB = 2; // 2MB制限
    

    let compressedUri = uri;
    let compress = 1.0; // デフォルトは圧縮なし

    // ファイルサイズが大きい場合、圧縮率を調整
    if (fileSizeMB > maxSizeMB) {
      // ファイルサイズに応じて圧縮率を計算
      compress = Math.max(0.3, maxSizeMB / fileSizeMB); // 最低30%まで圧縮
      
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 1920 } }], // 横幅を最大1920pxに制限
        { 
          compress, 
          format: ImageManipulator.SaveFormat.JPEG 
        }
      );

      compressedUri = manipulatedImage.uri;

      // 圧縮後のサイズを確認
      const compressedInfo = await FileSystemLegacy.getInfoAsync(compressedUri);
      if ('size' in compressedInfo) {
        const compressedSizeMB = compressedInfo.size / 1024 / 1024;

        // まだ大きい場合はさらに圧縮
        if (compressedSizeMB > maxSizeMB) {

          const secondPass = await ImageManipulator.manipulateAsync(
            compressedUri,
            [{ resize: { width: 1280 } }], // さらに小さく
            { 
              compress: 0.5, 
              format: ImageManipulator.SaveFormat.JPEG 
            }
          );
          compressedUri = secondPass.uri;

          const finalInfo = await FileSystemLegacy.getInfoAsync(compressedUri);
          if ('size' in finalInfo) {
            const finalSizeMB = finalInfo.size / 1024 / 1024;
          }
        }
      }
    } else {
      // サイズが小さい場合でも、念のためJPEGに変換
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [],
        { 
          compress: 0.9, 
          format: ImageManipulator.SaveFormat.JPEG 
        }
      );
      compressedUri = manipulatedImage.uri;
    }

    return {
      uri: compressedUri,
      name: `image_${index}.jpg`,
      type: 'image/jpeg',
    };
  } catch (error) {
    console.error(`❌ Error compressing image ${index}:`, error);
    throw error;
  }
}

export async function createPost(payload: CreatePostRequest) {
  const formData = new FormData();

  formData.append("category_id", String(payload.categoryId));
  formData.append("message", payload.message);
  formData.append("city_id", String(payload.cityId));
  formData.append("latitude", String(payload.latitude));
  formData.append("longitude", String(payload.longitude));

  // 画像を1つずつ圧縮してFormDataに追加
  for (let index = 0; index < payload.images.length; index++) {
    const uri = payload.images[index];
    
    try {
      const compressedFile = await compressImage(uri, index);
      formData.append("imageFiles[]", compressedFile as any);
    } catch (error) {
      console.error(`Failed to process image ${index}:`, error);
      throw new Error(`画像 ${index + 1} の処理に失敗しました`);
    }
  }
  
  return api<{ success: boolean }>("/post", {
    method: "POST",
    body: formData,
  });
}