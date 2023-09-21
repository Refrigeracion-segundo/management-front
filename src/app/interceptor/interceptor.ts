import { RootState } from "@/redux/store";
import axios from "axios";
import { Store } from "redux";
// import AuthActions from '../redux/actions/auth'
// import { ADD_NOTIFICATION, REFRESH_FAIL } from '../redux/actions/types'

export const setupAxiosTokenInterceptor = (store: Store<RootState>): any => {
  axios.interceptors.request.use((config) => {
    const storedUserStr = localStorage.getItem("user");

    if (!storedUserStr) return config;
    const userLogged = JSON.parse(storedUserStr);
    config.headers.Authorization = `Bearer ${userLogged.token}`;

    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("user");
        window.location.reload();
      }

      return Promise.reject(error);
    }
  );
};
