import { createApi } from "@reduxjs/toolkit/query/react";
import {
  LOGIN_URL,
  METHOD_TYPES,
  ROLES_URL,
  ReducerPaths,
  axiosBaseQuery,
} from "../config";
import {
  IDeleteGeneral,
  IRoleRegister,
  IRoleResponse,
  IRoleUpdate,
} from "@/app/common";

export const roleApi = createApi({
  reducerPath: ReducerPaths.ROLES,
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    registerRole: builder.mutation<IRoleResponse, IRoleRegister>({
      query: (data: IRoleRegister) => ({
        url: ROLES_URL.REGISTER,
        method: METHOD_TYPES.POST,
        data,
      }),
    }),
    findAllRoles: builder.query<Array<IRoleResponse>, void>({
      query: () => ({
        url: ROLES_URL.FIND_ALL,
        method: METHOD_TYPES.GET,
      }),
    }),
    updateRole: builder.mutation<IRoleResponse, IRoleUpdate>({
      query: (data: IRoleUpdate) => ({
        url: ROLES_URL.REGISTER,
        method: METHOD_TYPES.PUT,
        data,
      }),
    }),
    deleteRole: builder.mutation<IDeleteGeneral, IDeleteGeneral>({
      query: (params: IDeleteGeneral) => ({
        url: ROLES_URL.DELETE,
        method: METHOD_TYPES.DELETE,
        params,
      }),
    }),
  }),
});

export const {
  useRegisterRoleMutation,
  useLazyFindAllRolesQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleApi;
