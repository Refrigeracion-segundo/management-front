import { createApi } from "@reduxjs/toolkit/query/react";
import {
  METHOD_TYPES,
  ORDER_URL,
  ReducerPaths,
  axiosBaseQuery,
} from "../config";
import {
  IDeleteGeneral,
  IOrderRegister,
  IOrderResponse,
  IOrderUpdate,
} from "@/common";

export const orderApi = createApi({
  reducerPath: ReducerPaths.ORDER,
  baseQuery: axiosBaseQuery(),
  tagTypes: ["findAllOrder"],
  endpoints: (builder) => ({
    registerOrder: builder.mutation<IOrderResponse, IOrderRegister>({
      query: (data: IOrderRegister) => ({
        url: ORDER_URL.REGISTER,
        method: METHOD_TYPES.POST,
        data,
      }),
      invalidatesTags: ["findAllOrder"],
    }),
    findAllOrder: builder.query<IOrderResponse, void>({
      query: () => ({
        url: ORDER_URL.FIND_ALL,
        method: METHOD_TYPES.GET,
      }),
      providesTags: ["findAllOrder"],
    }),
    updateOrder: builder.mutation<IOrderResponse, IOrderUpdate>({
      query: (data: IOrderUpdate) => ({
        url: ORDER_URL.UPDATE,
        method: METHOD_TYPES.PATCH,
        data,
      }),
      invalidatesTags: ["findAllOrder"],
    }),
    deleteOrder: builder.mutation<IDeleteGeneral, IDeleteGeneral>({
      query: (params: IDeleteGeneral) => ({
        url: ORDER_URL.DELETE,
        method: METHOD_TYPES.DELETE,
        params,
      }),
      invalidatesTags: ["findAllOrder"],
    }),
  }),
});

export const {
  useRegisterOrderMutation,
  useLazyFindAllOrderQuery,
  useFindAllOrderQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
