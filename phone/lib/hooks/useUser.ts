import { useUserStore } from "@/store/useUserStore";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import useSWR, { useSWRConfig } from "swr";
import { IndexUserResponse, indexUser } from "../api/user";
import { IndexUserProfileResponse, indexUserProfile } from "../api/user/index-profile";
import { updateCity } from "../api/user/update-city";


export function useIndexUser() {
  const setUser = useUserStore((state) => state.setUser);
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const key = token ? "/user" : null;
  console.log(token)
  useEffect(() => {
    SecureStore.getItemAsync("auth_token").then((t) => setToken(t));
  }, []);

  const { error, isLoading, mutate } = useSWR<IndexUserResponse>(
    key,
    () => indexUser(),
    {
      onSuccess: (user) => {setUser(user), console.log(user)},
    }
  );
  return {
    isLoading: isLoading || token === undefined,
    isError: !!error,
    mutate,
  };
}

export function useIndexUserProfile() {
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const key = token ? "/user/profile" : null;
  useEffect(() => {
    SecureStore.getItemAsync("auth_token").then((t) => setToken(t));
  }, []);

  const { data, error, isLoading, mutate } = useSWR<IndexUserProfileResponse>(
    key,
    () => indexUserProfile(),
  );
  return {
    profile: data,
    isLoading: isLoading || token === undefined,
    isError: !!error,
    mutate,
  };
}

type UpdateCity = {
  cityName: string;
};

export function useUpdateCity() {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);

  const submit = async ({ cityName }: UpdateCity) => {
    setIsLoading(true);
    try {
      console.log("start")
      const res = await updateCity({city_name: cityName});
      console.log(res)
      await SecureStore.setItemAsync("user_city", res.cityId.toString());
      await mutate("/user");
      Toast.show({
        type: "success",
        text1: "地域選択を更新しました！",
      });
      router.replace(`/post?city_id=${res.cityId.toString()}`);
    } catch {
      Toast.show({
        type: "error",
        text1: "通信エラーが発生しました！",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return {
    submit,
    isLoading,
  };
}