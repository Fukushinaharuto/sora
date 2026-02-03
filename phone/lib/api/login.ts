import { api } from "./api";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export function login({email, password}: LoginRequest) {
  return api<LoginResponse>("/api/login", {
    method: "POST",
    body: { email, password },
  });
}