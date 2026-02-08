import { api } from "@/lib/api/api";

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

export async function createPost(payload: CreatePostRequest) {
  const formData = new FormData();

  formData.append("category_id", String(payload.categoryId));
  formData.append("message", payload.message);
  formData.append("city_id", String(payload.cityId));
  formData.append("latitude", String(payload.latitude));
  formData.append("longitude", String(payload.longitude));

  payload.images.forEach((uri, index) => {
    const file: RNFile = {
      uri,
      name: `image_${index}.jpg`,
      type: "image/jpeg",
    };
  
    formData.append("imageFiles[]", file as any);
  });
  console.log(formData)
  return api<{ success: boolean }>("/post", {
    method: "POST",
    body: formData,
  });
}
