import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:3000";

export const apiHandler = {
  getPlayableUrl: (id: string) => {
    return baseApiHandler.post(BASE_URL + "/api/get-playable-url", { id });
  },
};

export const baseApiHandler = {
  async get(api: string, config: AxiosRequestConfig = {}) {
    try {
      const r = await axios.get(api, {
        ...config,
      });
      return r.data;
    } catch (error) {
      throw new Error("[GET] A error have occurred!" + error);
    }
  },
  async post(api: string, data: any = {}, config: AxiosRequestConfig = {}) {
    try {
      const r = await axios.post(api, data, { ...config });
      return r.data;
    } catch (error) {
      throw new Error("[POST] A error have occurred!" + error);
    }
  },
};
