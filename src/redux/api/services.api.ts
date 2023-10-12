import { createApi } from "@reduxjs/toolkit/query/react";
import {
  METHOD_TYPES,
  SERVICE_URL,
  ReducerPaths,
  axiosBaseQuery,
} from "../config";
import {
  IDeleteGeneral,
  IFilters,
  IServiceRegister,
  IServiceResponse,
  IServiceUpdate,
} from "@/common";
import { getFilters } from "../constants/getFIlters";

export const serviceApi = createApi({
  reducerPath: ReducerPaths.SERVICE,
  baseQuery: axiosBaseQuery(),
  tagTypes: ["findAllService"],
  endpoints: (builder) => ({
    registerService: builder.mutation<IServiceResponse, IServiceRegister>({
      query: (data: IServiceRegister) => ({
        url: SERVICE_URL.REGISTER,
        method: METHOD_TYPES.POST,
        data,
      }),
      invalidatesTags: ["findAllService"],
    }),
    findAllService: builder.query<Array<IServiceResponse>, IFilters | void>({
      query: (params) => ({
        url: `${SERVICE_URL.FIND_ALL}?${getFilters(params)}`,
        method: METHOD_TYPES.GET,
      }),
      providesTags: ["findAllService"],
    }),
    updateService: builder.mutation<IServiceResponse, IServiceUpdate>({
      query: (data: IServiceUpdate) => ({
        url: SERVICE_URL.UPDATE,
        method: METHOD_TYPES.PATCH,
        data,
      }),
      invalidatesTags: ["findAllService"],
    }),
    deleteService: builder.mutation<IDeleteGeneral, IDeleteGeneral>({
      query: (params: IDeleteGeneral) => ({
        url: SERVICE_URL.DELETE,
        method: METHOD_TYPES.DELETE,
        params,
      }),
      invalidatesTags: ["findAllService"],
    }),
  }),
});

export const {
  useRegisterServiceMutation,
  useFindAllServiceQuery,
  useLazyFindAllServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
