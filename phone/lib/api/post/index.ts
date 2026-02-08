import { api } from "@/lib/api/api";

export type IndexPostRequest = {
  city_id: number;
  category_id: number;
  latitude: number;
  longitude: number
};
export type Post = {
  id: number,
  categoryId: number,
  postedBy: string;
  weatherType : string;
  temperature: number;
  isLiked: boolean,
  likeCount: number,
  message: string,
  imageUrl: string,
  createdAt: string
}
export type IndexPostResponse = {
  cityName: string;
  weatherType: string;
  maxTemperature: number;
  minTemperature: number;
  posts: Post[]
};

export function indexPost({city_id, category_id, latitude, longitude}: IndexPostRequest) {
  return api<IndexPostResponse>(`/post/${city_id}?category_id=${category_id}&latitude=${latitude}&longitude=${longitude}`, {
    method: "GET",
  });
}