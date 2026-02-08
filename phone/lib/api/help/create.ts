
import { api } from "../api";

export type CreateHelpRequest = {
  message: string;
  city_id: number;
  address: string;
  latitude: number;
  longitude: number;
};


export function createHelp(data: CreateHelpRequest) {
  console.log(data)
  return api("/help", {
    method: "POST",
    body: data ,
  });
}