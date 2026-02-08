
import { api } from "../api";

export function updateHelped() {
  return api("/helped", {
    method: "POST",
  });
}