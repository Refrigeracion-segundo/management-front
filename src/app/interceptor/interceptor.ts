import { RootState } from "@/redux/store";
import axios from "axios";
import { Store } from "redux";
// import AuthActions from '../redux/actions/auth'
// import { ADD_NOTIFICATION, REFRESH_FAIL } from '../redux/actions/types'

export const setupAxiosTokenInterceptor = (store: Store<RootState>): any => {
  axios.interceptors.request.use((config) => {
    const storedUserStr = localStorage.getItem("user");
    console.log(storedUserStr);
    if (!storedUserStr) return config;
    const userLogged = JSON.parse(storedUserStr);
    console.log(userLogged);
    config.headers = {
      Authorization: `bearer ${userLogged.token}`,
    } as any;

    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      if (error.response.status === 401) {
        // store.dispatch({ type: REFRESH_FAIL })
        // window.location.replace('/login')
        // AuthActions.logout()(store)
      }
      console.log(error.response.data);
      //   store.dispatch({
      //     type: ADD_NOTIFICATION,
      //     payload: { message: error.response.data.message, type: 'error' },
      //   })
      return Promise.reject(error);
    }
  );
};
