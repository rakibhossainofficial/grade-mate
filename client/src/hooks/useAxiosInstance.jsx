import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://grade-mate-gamma.vercel.app",
  withCredentials: true,
});

export default function useAxiosInstance() {
  return axiosInstance;
}
