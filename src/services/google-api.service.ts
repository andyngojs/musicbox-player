import { gapi } from "google-api-javascript-client";
import type { ApiConfig } from "@/types/api";
import type { YouTubeVideoListResponse } from "@/types/video-yt-response";
import { createApi } from "@/utils/createApi";

const GAPI_KEY = process.env.GOOGLE_API_KEY;
export const BASE_URL_GAPI_YOUTUBE_V3: string =
  "https://www.googleapis.com/youtube/v3/";
export const GAPI_DISCOVERY_YOUTUBE_V3: string =
  "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest/";

export const apiHandlerGApi = {
  search(params: any = {}, handleSuccess: (data: any) => void) {
    return baseApiHandlerGApi.get(
      "search",
      params,
      {
        params: {
          regionCode: "VN",
          part: "snippet",
          channelType: "any",
          order: "viewCount",
        },
      },
      (response) => handleSuccess(response),
    );
  },
  getVideos(
    params: any = {},
    handleSuccess: (data: YouTubeVideoListResponse) => void,
  ) {
    return baseApiHandlerGApi.get<YouTubeVideoListResponse>(
      "videos",
      params,
      {
        params: {
          part: "snippet,contentDetails",
          regionCode: "VN",
        },
      },
      (response) => handleSuccess(response),
    );
  },
};

export const baseApiHandlerGApi = {
  get<T>(
    endpoint: string,
    params: {} = {},
    config: ApiConfig = {},
    onSuccess: (response: T) => void,
  ) {
    return baseGAPIRequest(
      endpoint,
      {
        ...config,
        method: "GET",
        params: {
          ...config.params,
          ...params,
        },
      },
      onSuccess,
    );
  },
  post<T>(
    endpoint: string,
    data: {} = {},
    config: ApiConfig = {},
    onSuccess: (response: T) => void,
  ) {
    return baseGAPIRequest(
      endpoint,
      {
        ...config,
        method: "POST",
        body: data,
      },
      onSuccess,
    );
  },
};

export async function baseGAPIRequest(
  endpoint: string,
  config: ApiConfig,
  callBackSuccess: (response: any) => void,
) {
  const start = async () => {
    try {
      await gapi.client.init({
        apiKey: GAPI_KEY,
        discoveryDocs: [GAPI_DISCOVERY_YOUTUBE_V3],
      });
      const response = await gapi.client.request({
        path: createApi(endpoint),
        ...config,
      });
      callBackSuccess?.(response?.result);
    } catch (e) {
      console.log("error: ", e);
    }
  };

  gapi.load("client", start);
}
