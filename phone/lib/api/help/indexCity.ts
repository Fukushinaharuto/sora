import { api } from "@/lib/api/api";

export type IndexHelpCityRequest = {
  city_id: number
}

export type IndexHelpCityResponse = {
  latitude: number,
  longitude: number,
}

export function indexHelpCity({ city_id }: IndexHelpCityRequest) {
  return api<IndexHelpCityResponse>(`/help?city_id=${city_id}`, {
    method: "GET",
  });
}