import { createPost, CreatePostRequest } from "@/lib/api/post/create";
import { useLocationStore } from "@/store/useCurrentGet";
import { useState } from "react";
import Toast from "react-native-toast-message";
import useSWR, { useSWRConfig } from "swr";
import { indexPost, IndexPostResponse } from "../api/post";
import { createLikePost } from "../api/post/like";
import { showPost, ShowPostResponse } from "../api/post/show";

export function useIndexPost(city_id: number, category_id: number, isActive: boolean) {
  const latitude = useLocationStore((state) => state.latitude);
  const longitude = useLocationStore((state) => state.longitude);
  const key =
    city_id && isActive
      ? `/post?city_id=${city_id}&category_id=${category_id}`
      : null;
  const { data, error, isLoading, mutate } = useSWR(
    key,
    () =>
      indexPost({
        city_id,
        category_id,
        latitude: latitude!,
        longitude: longitude!,
      }),
    {
      refreshInterval: isActive ? 5000 : 0,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );
  return {
    posts: data?.posts ?? [],
    cityName: data?.cityName ?? "",
    weatherType: data?.weatherType ?? "",
    maxTemperature: data?.maxTemperature ?? 0,
    minTemperature: data?.minTemperature ?? 0,
    isLoading,
    isError: !!error,
    mutate, // ← これで再取得・再検証できる
  };
}

export function useShowPost(post_id: number) {
  const key = post_id
    ? `/post/show/${post_id}`
    : null;

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => showPost({ post_id })
  );

  return {
    post: data,
    isLoading,
    isError: !!error,
    mutate,
  };
}

export function useCreatePost() {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
    const submit = async (data: CreatePostRequest) => {
    setIsLoading(true);
    const userProfileKey = "/user/profile";
    try {
      await createPost(data);
      Toast.show({
        type: "success",
        text1: "投稿しました！",
      });
      // フェッチしたデータで更新
      mutate((key) => typeof key === "string" && key.startsWith("/post?city_id="));
      mutate(userProfileKey);
    } catch (e: any) {
      if (e?.status === 422) {
        // バリデーションエラー
        Toast.show({
          type: "error",
          text1: e.message,
        });
      } else {
        // それ以外のエラー
        Toast.show({
          type: "error",
          text1: "投稿に失敗しました",
        });
      }
      throw e;
    } finally {
      setIsLoading(false);
    }
  };
  return {
    submit,
    isLoading,
  };
}

type CreateLikePost = {
  postId: number;
};

export function useCreateLikePost() {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);

  const submit = async ({ postId }: CreateLikePost) => {
    setIsLoading(true);
    const showKey = `/post/show/${postId}`;
    const userProfileKey = "/user/profile";
    // ① まず楽観的に更新（詳細）
    mutate(
      showKey,
      (current: ShowPostResponse | undefined) => {
        if (!current) return current;
        const nextLiked = !current.isLiked;
        return {
          ...current,
          isLiked: nextLiked,
          likeCount: current.likeCount + (nextLiked ? 1 : -1),
        };
      },
      false
    );

    // ② 一覧も楽観的に更新
    mutate(
      (key) => typeof key === "string" && key.startsWith("/post?city_id="),
      (current: IndexPostResponse | undefined) => {
        if (!current) return current;
        return {
          ...current,
          posts: current.posts.map((post) => {
            if (post.id !== postId) return post;
            const nextLiked = !post.isLiked;
            return {
              ...post,
              isLiked: nextLiked,
              likeCount: post.likeCount + (nextLiked ? 1 : -1),
            };
          }),
        };
      },
      false
    );

    try {
      // ③ API 実行
      const res = await createLikePost({ post_id: postId });

      // ④ サーバーの確定値で上書き（ズレ防止）
      mutate(
        showKey,
        (current: ShowPostResponse | undefined) =>
          current
            ? { ...current, isLiked: res.isLiked, likeCount: res.likeCount }
            : current,
        false
      );

      mutate(
        (key) => typeof key === "string" && key.startsWith("/post?city_id="),
        (current: IndexPostResponse | undefined) =>
          current
            ? {
                ...current,
                posts: current.posts.map((post) =>
                  post.id === postId
                    ? { ...post, isLiked: res.isLiked, likeCount: res.likeCount }
                    : post
                ),
              }
            : current,
        false
      );
      mutate(userProfileKey);
    } catch {
      // ⑤ 失敗したら再検証して元に戻す
      mutate(showKey);
      mutate((key) => typeof key === "string" && key.startsWith("/post?city_id="));
      mutate(userProfileKey);
      Toast.show({
        type: "error",
        text1: "いいねに失敗しました！",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading };
}
