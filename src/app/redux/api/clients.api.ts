import { createApi } from "@reduxjs/toolkit/query/react";
import {
  METHOD_TYPES,
  CLIENTS_URL,
  ReducerPaths,
  axiosBaseQuery,
} from "../config";
import {
  IClientRegister,
  IClientResponse,
  IClientUpdate,
  IDeleteGeneral,
} from "@/app/common";

export const clientsApi = createApi({
  reducerPath: ReducerPaths.CLIENTS,
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    registerClient: builder.mutation<IClientResponse, IClientRegister>({
      query: (data: IClientRegister) => ({
        url: CLIENTS_URL.REGISTER,
        method: METHOD_TYPES.POST,
        data,
      }),
    }),
    findAllClients: builder.query<Array<IClientResponse>, void>({
      query: () => ({
        url: CLIENTS_URL.FIND_ALL,
        method: METHOD_TYPES.GET,
      }),
    }),
    updateClient: builder.mutation<IClientResponse, IClientUpdate>({
      query: (data: IClientUpdate) => ({
        url: CLIENTS_URL.UPDATE,
        method: METHOD_TYPES.PUT,
        data,
      }),
    }),
    deleteClient: builder.mutation<IDeleteGeneral, IDeleteGeneral>({
      query: (params: IDeleteGeneral) => ({
        url: CLIENTS_URL.DELETE,
        method: METHOD_TYPES.DELETE,
        params,
      }),
    }),
  }),
});

export const {
  useRegisterClientMutation,
  useLazyFindAllClientsQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientsApi;
