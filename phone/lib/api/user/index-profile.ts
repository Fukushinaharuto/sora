import { api } from "@/lib/api/api";

export type IndexUserProfileResponse = {
  postCount: number;
  likeCount: number;
  activeDays: number;
  recentActivities: {
    date: string;
    postCount: number,
    likeCount: number,
  }[],
}

export function indexUserProfile() {
  return api<IndexUserProfileResponse>(`/user/profile`, {
    method: "GET",
  });
}