import { ErrorsTranslate } from "@/common/constants/errors";
import { viewNotification } from "@/redux/slices/notification";
import { RootState, dispatchGlobal } from "@/redux/store";
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
      console.log(error.response);
      // if (typeof error.response?.data?.message == "string")
      //   dispatchGlobal(
      //     viewNotification(
      //       ErrorsTranslate.get(error.response?.data?.message) as string
      //     )
      //   );
      // if (Array.isArray(error.response?.data?.message))
      //   dispatchGlobal(
      //     viewNotification(
      //       "A ocurrido un error en el servicio, contacte con el desarrollador"
      //     )
      //   );
      if (error.response.status === 401) {
        localStorage.removeItem("user");
        window.location.reload();
      }

      return Promise.reject(error);
    }
  );
};
