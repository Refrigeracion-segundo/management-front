import { createApi } from "@reduxjs/toolkit/query/react";
import {
  LOGIN_URL,
  METHOD_TYPES,
  ReducerPaths,
  axiosBaseQuery,
} from "../config";

export const loginApi = createApi({
  reducerPath: ReducerPaths.LOGIN,
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<void, any>({
      query: (data: any) => ({
        url: LOGIN_URL.LOGIN,
        method: METHOD_TYPES.POST,
        data,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;
