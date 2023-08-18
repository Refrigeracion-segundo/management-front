import { createApi } from "@reduxjs/toolkit/query/react";
import {
  LOGIN_URL,
  METHOD_TYPES,
  USER_URL,
  ReducerPaths,
  axiosBaseQuery,
} from "../config";
import {
  IDeleteGeneral,
  IUserRegister,
  IUserResponse,
  IUserUpdate,
} from "@/app/common";

export const userApi = createApi({
  reducerPath: ReducerPaths.USERS,
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    registerUser: builder.mutation<IUserResponse, IUserRegister>({
      query: (data: IUserRegister) => ({
        url: USER_URL.REGISTER,
        method: METHOD_TYPES.POST,
        data,
      }),
    }),
    findAllUsers: builder.query<Array<IUserResponse>, void>({
      query: () => ({
        url: USER_URL.FIND_ALL,
        method: METHOD_TYPES.GET,
      }),
    }),
    updateUser: builder.mutation<IUserResponse, IUserUpdate>({
      query: (data: IUserUpdate) => ({
        url: USER_URL.REGISTER,
        method: METHOD_TYPES.PUT,
        data,
      }),
    }),
    deleteUser: builder.mutation<IDeleteGeneral, IDeleteGeneral>({
      query: (params: IDeleteGeneral) => ({
        url: USER_URL.DELETE,
        method: METHOD_TYPES.DELETE,
        params,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLazyFindAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
