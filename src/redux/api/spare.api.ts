import { createApi } from "@reduxjs/toolkit/query/react";
import {
  METHOD_TYPES,
  SPARE_URL,
  ReducerPaths,
  axiosBaseQuery,
} from "../config";
import {
  IDeleteGeneral,
  ISpareRegister,
  ISpareResponse,
  ISpareUpdate,
} from "@/common";
import { getFilters } from "../constants/getFIlters";

export const spareApi = createApi({
  reducerPath: ReducerPaths.SPARE,
  baseQuery: axiosBaseQuery(),
  tagTypes: ["findAllSpare"],
  endpoints: (builder) => ({
    registerSpare: builder.mutation<ISpareResponse, ISpareRegister>({
      query: (data: ISpareRegister) => ({
        url: SPARE_URL.REGISTER,
        method: METHOD_TYPES.POST,
        data,
      }),
      invalidatesTags: ["findAllSpare"],
    }),
    findAllSpare: builder.query<
      Array<ISpareResponse>,
      {
        filter?: string;
        search?: string;
      }
    >({
      query: (params) => ({
        url: `${SPARE_URL.FIND_ALL}?${getFilters(params)}`,
        method: METHOD_TYPES.GET,
      }),
      providesTags: ["findAllSpare"],
    }),
    updateSpare: builder.mutation<ISpareResponse, ISpareUpdate>({
      query: (data: ISpareUpdate) => ({
        url: SPARE_URL.UPDATE,
        method: METHOD_TYPES.PATCH,
        data,
      }),
      invalidatesTags: ["findAllSpare"],
    }),
    deleteSpare: builder.mutation<IDeleteGeneral, IDeleteGeneral>({
      query: (params: IDeleteGeneral) => ({
        url: SPARE_URL.DELETE,
        method: METHOD_TYPES.DELETE,
        params,
      }),
      invalidatesTags: ["findAllSpare"],
    }),
  }),
});

export const {
  useRegisterSpareMutation,
  useLazyFindAllSpareQuery,
  useFindAllSpareQuery,
  useUpdateSpareMutation,
  useDeleteSpareMutation,
} = spareApi;
