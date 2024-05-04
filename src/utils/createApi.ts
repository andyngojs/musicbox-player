import { BASE_URL_GAPI_YOUTUBE_V3 } from "@/services/google-api.service";

export const createApi = (endpoint: string) => {
  return BASE_URL_GAPI_YOUTUBE_V3 + endpoint;
};
