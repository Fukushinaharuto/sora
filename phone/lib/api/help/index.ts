import { api } from "@/lib/api/api";

export type IndexHelpRequest = {
  city_id: number
}

export type IndexHelpResponse = {
  id: number,
  name: string,
  createAt: string,
  status: "waiting" | "in_progress",
  helpersCount: number,
  latitude: number,
  longitude: number,
  address: string, 
  message: string,
  isHelping: boolean,
}

export function indexHelp({ city_id }: IndexHelpRequest) {
  return api<IndexHelpResponse[]>(`/help?city_id=${city_id}`, {
    method: "GET",
  });
}