// lib/api.ts
import { getToken } from "./token";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

type ApiBody = Record<string, unknown> | FormData;

type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: ApiBody;
};

type ApiError = {
  message: string;
  errors?: Record<string, string[]>;
};

export class HttpError extends Error {
  status: number;
  data?: ApiError;

  constructor(status: number, message: string, data?: ApiError) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export async function api<T>(
  endpoint: string,
  { method = "GET", body }: ApiOptions = {}
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const token = await getToken();

    const isFormData = body instanceof FormData;

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        // FormData のときは Content-Type を付けない！
        ...(!isFormData && { "Content-Type": "application/json" }),
      },
      body: body
        ? isFormData
          ? body
          : JSON.stringify(body)
        : undefined,
      signal: controller.signal,
    });

    const text = await res.text();
    const json = text ? JSON.parse(text) : null;

    if (!res.ok) {
      throw new HttpError(
        res.status,
        json?.message ?? "通信エラーが発生しました",
        json ?? undefined
      );
    }

    return json as T;
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      throw new HttpError(0, "通信がタイムアウトしました");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
