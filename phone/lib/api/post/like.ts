import { api } from "@/lib/api/api";

export type CreateLikeRequest = {
  post_id: number;
};

export type CreateLikeResponse = {
  isLiked: boolean;
  likeCount: number;
};


export function createLikePost({post_id}: CreateLikeRequest) {
  return api<CreateLikeResponse>("/post/like", {
    method: "POST",
    body: { post_id },
  });
}