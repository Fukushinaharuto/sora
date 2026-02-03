import { api } from "@/lib/api/api";

export type CreatePostPayload = {
    categoryId: number,
    message: string,
    images: string[],
    cityId: number,
};

type RNFile = {
  uri: string;
  name: string;
  type: string;
};

export async function createPost(payload: CreatePostPayload) {
  const formData = new FormData();

  formData.append("category_id", String(payload.categoryId));
  formData.append("message", payload.message);
  formData.append("city_id", String(payload.cityId));

  payload.images.forEach((uri, index) => {
    const file: RNFile = {
      uri,
      name: `image_${index}.jpg`,
      type: "image/jpeg",
    };
  
    formData.append("imageFiles[]", file as any);
  });

  return api<{ success: boolean }>("/posts", {
    method: "POST",
    body: formData,
    // ⚠️ Content-Type は自分で指定しない（fetchが自動で付ける）
  });
}
