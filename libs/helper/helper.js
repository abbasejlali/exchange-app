import axios from "axios";

export const CallApi = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      console.error("Error fetching exchange rate:", err);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      console.error("Error fetching exchange rate:", err);
    }
  );
  return axiosInstance;
};
