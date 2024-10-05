import axios from "axios";

export const CallApi = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      config.withCredentials = true;
      return config;
    },
    (err) => {
      throw err;
    }
  );
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalRequest = err.config;
      const res = err.response;
      if (res.status === 400) {
        throw new console.log(res?.data?.errors?.message);
      }
      if (res.status === 404) {
        throw new console.log(res?.data?.errors?.message);
      }
      if (res.status === 406) {
        throw new console.log(res?.data?.errors?.message);
      }

      throw err;
    }
  );
  return axiosInstance;
};
