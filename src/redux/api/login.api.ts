import { createApi } from "@reduxjs/toolkit/query/react";
import {
  LOGIN_URL,
  METHOD_TYPES,
  ReducerPaths,
  axiosBaseQuery,
} from "../config";
import { ILogin, ILoginResponse } from "@/common";
import moment from "moment";

export const loginApi = createApi({
  reducerPath: ReducerPaths.LOGIN,
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILogin>({
      query: (data: ILogin) => ({
        url: LOGIN_URL.LOGIN,
        method: METHOD_TYPES.POST,
        data,
      }),
      transformResponse: (response: ILoginResponse) => {
        response.expiresIn = moment().add(response.expiresInMinutes, "minutes");
        localStorage.setItem("user", JSON.stringify(response));
        return response;
      },
    }),
  }),
});

export const { useLoginMutation } = loginApi;
