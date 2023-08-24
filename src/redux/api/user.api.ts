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
} from "@/common";

export const userApi = createApi({
  reducerPath: ReducerPaths.USERS,
  baseQuery: axiosBaseQuery(),
  tagTypes: ["registerUser"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<IUserResponse, IUserRegister>({
      query: (data: IUserRegister) => ({
        url: USER_URL.REGISTER,
        method: METHOD_TYPES.POST,
        data,
      }),
      invalidatesTags: ["registerUser"],
    }),
    findAllUsers: builder.query<Array<IUserResponse>, void>({
      query: () => ({
        url: USER_URL.FIND_ALL,
        method: METHOD_TYPES.GET,
      }),
      providesTags: ["registerUser"],
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
      invalidatesTags: ["registerUser"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLazyFindAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
