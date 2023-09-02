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
  ROLES,
} from "@/common";

export const userApi = createApi({
  reducerPath: ReducerPaths.USERS,
  baseQuery: axiosBaseQuery(),
  tagTypes: ["findAllUsers"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<IUserResponse, IUserRegister>({
      query: (data: IUserRegister) => ({
        url: USER_URL.REGISTER,
        method: METHOD_TYPES.POST,
        data,
      }),
      invalidatesTags: ["findAllUsers"],
    }),
    findAllUsers: builder.query<Array<IUserResponse>, void>({
      query: () => ({
        url: USER_URL.FIND_ALL,
        method: METHOD_TYPES.GET,
      }),
      providesTags: ["findAllUsers"],
    }),
    findUserTechnicians: builder.query<Array<IUserResponse>, void>({
      query: () => ({
        url: `${USER_URL.FIND_TECH}/${ROLES.TECHNICAL}`,
        method: METHOD_TYPES.GET,
      }),
    }),
    updateUser: builder.mutation<IUserResponse, IUserUpdate>({
      query: (data: IUserUpdate) => ({
        url: USER_URL.UPDATE,
        method: METHOD_TYPES.PATCH,
        data,
      }),
      invalidatesTags: ["findAllUsers"],
    }),
    deleteUser: builder.mutation<IDeleteGeneral, IDeleteGeneral>({
      query: (params: IDeleteGeneral) => ({
        url: USER_URL.DELETE,
        method: METHOD_TYPES.DELETE,
        params,
      }),
      invalidatesTags: ["findAllUsers"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLazyFindAllUsersQuery,
  useLazyFindUserTechniciansQuery,
  useFindAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
