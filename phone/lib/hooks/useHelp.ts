import { useUserStore } from "@/store/useUserStore";
import { useState } from "react";
import Toast from "react-native-toast-message";
import useSWR, { useSWRConfig } from "swr";
import { indexHelp } from "../api/help";
import { CreateHelpRequest, createHelp } from "../api/help/create";
import { createAssignments } from "../api/help/createAssignments";
import { indexHelpCity } from "../api/help/indexCity";
import { updateHelped } from "../api/help/updateHelped";

export function useIndexHelp(city_id: number) {
  const key = city_id
    ? `/help?city_id=${city_id}`
    : null;
  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => indexHelp({ city_id }),
    {
      refreshInterval: 5000,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    tasks: data ?? [],
    isLoading,
    isError: !!error,
    mutate,
  };
}

export function useIndexHelpCity(city_id: number) {
  const key = city_id
    ? `/help/city?city_id=${city_id}`
    : null;

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => indexHelpCity({ city_id })
  );

  return {
    location: data,
    isLoading,
    isError: !!error,
    mutate,
  };
}

export function useCreateAssignments() {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  
    const submit = async (city_id: number, help_request_id: number) => {
    setIsLoading(true);
    const key = city_id
    ? `/help?city_id=${city_id}`
    : null;
    try {
      await createAssignments({ help_request_id });
      Toast.show({
        type: "success",
        text1: "助けに向かいましょう！",
      });
      // フェッチしたデータで更新
      mutate(key);
    } catch (e: any) {
      if (e?.status === 422) {
        // バリデーションエラー
        Toast.show({
          type: "error",
          text1: e.message,
        });
      } else if (e?.status === 403) {
        Toast.show({
          type: "error",
          text1: e.message,
        });
      } else {
        // それ以外のエラー
        Toast.show({
          type: "error",
          text1: "同時に複数の依頼を承諾することはできません",
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

export function useCreateHelp() {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useUserStore((s) => s.setUser);
  const user = useUserStore.getState().user;
  const submit = async (data: CreateHelpRequest) => {
    setIsLoading(true);
    const key = data.city_id
    ? `/help?city_id=${data.city_id}`
    : null;
    try {
      await createHelp(data);
      Toast.show({
        type: "success",
        text1: "助けを申請しました！",
      });
      // フェッチしたデータで更新
      if (user) {
        setUser({
          ...user,
          status: true, // ここでstatusだけtrueに更新
        });
      }
      mutate(key);
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
          text1: "助けを呼ぶのに失敗しました！",
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



export function useUpdateHelped() {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useUserStore((s) => s.setUser);
  const user = useUserStore.getState().user;
  const submit = async (city_id: number) => {
    setIsLoading(true);
    const key = city_id
    ? `/help?city_id=${city_id}`
    : null;
    try {
      await updateHelped();
      Toast.show({
        type: "success",
        text1: "お助け申請を取り消しました",
      });
      // フェッチしたデータで更新
      if (user) {
        setUser({
          ...user,
          status: false, // ここでstatusだけtrueに更新
        });
      }
      mutate(key);
    } catch (e: any) {
      console.log(e)
      if (e?.status === 422) {
        console.log(e)
        // バリデーションエラー
        Toast.show({
          type: "error",
          text1: e.message,
        });
      } else {
        // それ以外のエラー
        Toast.show({
          type: "error",
          text1: "お助け申請の取り消しに失敗しました",
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

