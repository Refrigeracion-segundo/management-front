import { createApi } from "@reduxjs/toolkit/query/react";
import {
  METHOD_TYPES,
  FISCAL_REGIME_URL,
  ReducerPaths,
  axiosBaseQuery,
} from "../config";
import {
  IDeleteGeneral,
  IRegimeRegister,
  IRegimeResponse,
  IRegimeUpdate,
} from "@/common";

export const fiscalRegimeApi = createApi({
  reducerPath: ReducerPaths.FISCAL_REGIME,
  baseQuery: axiosBaseQuery(),
  tagTypes: ["findAllFiscalRegime"],
  endpoints: (builder) => ({
    registerRegime: builder.mutation<IRegimeResponse, IRegimeRegister>({
      query: (data: IRegimeRegister) => ({
        url: FISCAL_REGIME_URL.REGISTER,
        method: METHOD_TYPES.POST,
        data,
      }),
      invalidatesTags: ["findAllFiscalRegime"],
    }),
    findAllFiscalRegime: builder.query<Array<IRegimeResponse>, void>({
      query: () => ({
        url: FISCAL_REGIME_URL.FIND_ALL,
        method: METHOD_TYPES.GET,
      }),
      providesTags: ["findAllFiscalRegime"],
    }),
    updateRegime: builder.mutation<IRegimeResponse, IRegimeUpdate>({
      query: (data: IRegimeUpdate) => ({
        url: FISCAL_REGIME_URL.UPDATE,
        method: METHOD_TYPES.PATCH,
        data,
      }),
      invalidatesTags: ["findAllFiscalRegime"],
    }),
    deleteRegime: builder.mutation<IDeleteGeneral, IDeleteGeneral>({
      query: (params: IDeleteGeneral) => ({
        url: FISCAL_REGIME_URL.DELETE,
        method: METHOD_TYPES.DELETE,
        params,
      }),
      invalidatesTags: ["findAllFiscalRegime"],
    }),
    reactive: builder.mutation<void, string>({
      query: (_id: string) => ({
        url: FISCAL_REGIME_URL.REACTIVATE,
        method: METHOD_TYPES.PATCH,
        data: { _id },
      }),
      invalidatesTags: ["findAllFiscalRegime"],
    }),
  }),
});

export const {
  useRegisterRegimeMutation,
  useFindAllFiscalRegimeQuery,
  useLazyFindAllFiscalRegimeQuery,
  useUpdateRegimeMutation,
  useDeleteRegimeMutation,
  useReactiveMutation,
} = fiscalRegimeApi;
