import { createApi } from "@reduxjs/toolkit/query/react";
import {
  METHOD_TYPES,
  SERVICE_DESCRIPTION_URL,
  ReducerPaths,
  axiosBaseQuery,
} from "../config";
import {
  IDeleteGeneral,
  IServiceDescriptionRegister,
  IServiceDescriptionResponse,
  IServiceDescriptionUpdate,
} from "@/common";

export const serviceDescriptionApi = createApi({
  reducerPath: ReducerPaths.SERVICE_DESCRIPTION,
  baseQuery: axiosBaseQuery(),
  tagTypes: ["findAllServiceDescription"],
  endpoints: (builder) => ({
    registerServiceDescription: builder.mutation<
      IServiceDescriptionResponse,
      IServiceDescriptionRegister
    >({
      query: (data: IServiceDescriptionRegister) => ({
        url: SERVICE_DESCRIPTION_URL.REGISTER,
        method: METHOD_TYPES.POST,
        data,
      }),
      invalidatesTags: ["findAllServiceDescription"],
    }),
    findAllServiceDescription: builder.query<
      Array<IServiceDescriptionResponse>,
      void
    >({
      query: () => ({
        url: SERVICE_DESCRIPTION_URL.FIND_ALL,
        method: METHOD_TYPES.GET,
      }),
      providesTags: ["findAllServiceDescription"],
    }),
    updateServiceDescription: builder.mutation<
      IServiceDescriptionResponse,
      IServiceDescriptionUpdate
    >({
      query: (data: IServiceDescriptionUpdate) => ({
        url: SERVICE_DESCRIPTION_URL.UPDATE,
        method: METHOD_TYPES.PATCH,
        data,
      }),
      invalidatesTags: ["findAllServiceDescription"],
    }),
    deleteServiceDescription: builder.mutation<IDeleteGeneral, IDeleteGeneral>({
      query: (params: IDeleteGeneral) => ({
        url: SERVICE_DESCRIPTION_URL.DELETE,
        method: METHOD_TYPES.DELETE,
        params,
      }),
      invalidatesTags: ["findAllServiceDescription"],
    }),
  }),
});

export const {
  useRegisterServiceDescriptionMutation,
  useFindAllServiceDescriptionQuery,
  useUpdateServiceDescriptionMutation,
  useDeleteServiceDescriptionMutation,
} = serviceDescriptionApi;
