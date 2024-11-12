import axios from "axios";
const createAxiosInstance = (BASE_URL) => {
  const commmonAxios = axios.create({
    baseURL: `${BASE_URL}/`,
  });

  const interceptor = async (config: any) => {
    const token = localStorage.getItem("CoreToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  };
  commmonAxios.interceptors.request.use(interceptor);
  return commmonAxios;
};
export default createAxiosInstance;
