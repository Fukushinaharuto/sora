// lib/hooks/useAuth.ts
import { HttpError } from "@/lib/api/api";
import { login, LoginRequest } from "@/lib/api/auth/login";
import { useUserStore } from "@/store/useUserStore";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { register } from "../api/auth/register";

export function useLogin() {
  // const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useUserStore((s) => s.setUser);
  const submit = async ({ email, password }: LoginRequest) => {
    setIsLoading(true);
    try {
      const res = await login({email, password});
      SecureStore.setItemAsync("auth_token", res.token);
      SecureStore.setItemAsync("user_city", res.user.cityId.toString());
      setUser(res.user);
      Toast.show({
        type: "success",
        text1: "ログインに成功しました！",
      });
      router.replace(`/post?city_id=${String(res.user.cityId)}`);
    }  catch (e:any) {
      console.log(e)
      if (e?.status === 422) {
        Toast.show({
          type: "error",
          text1: e.message,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "メールアドレスまたはパスワードが違います！",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return {
    submit,
    isLoading,
  };
}

type Register = {
  name: string;
  email: string;
  password: string;
}
export function useRegister() {
  // const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useUserStore((s) => s.setUser);
  const submit = async ({ name, email, password }: Register) => {
    setIsLoading(true);
    try {
      const cityId = await SecureStore.getItemAsync("user_city");
      if (!cityId) {
        Toast.show({
          type: "error",
          text1: "地域が選択されていません",
        });
        router.replace("/location");
        return;
      }
      const res = await register({name, email, password, city_id: Number(cityId)});
      await SecureStore.setItemAsync("auth_token", res.token);
      setUser(res.user);
      Toast.show({
        type: "success",
        text1: "ユーザー登録に成功しました！",
      });
      console.log(res.token)
      router.replace(`/post?city_id=${String(res.user.cityId)}`);
    } catch (e) {
      if (e instanceof HttpError && e.status === 422) {
        // バリデーションエラー（Laravelからのメッセージ）
        Toast.show({
          type: "error",
          text1: e.message,
        });
      } else {
        // それ以外のすべてのエラー
        Toast.show({
          type: "error",
          text1: "メールアドレスまたはパスワードが違います！",
        });
      }
    }finally {
      setIsLoading(false);
    }
  };
  return {
    submit,
    isLoading,
  };
}
