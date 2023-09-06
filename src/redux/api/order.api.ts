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
import moment from "moment";

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
    findAllOrder: builder.query<
      IOrderResponse,
      {
        perPage: number;
        page: number;
        fromDate: Date;
        toDate: Date;
        description: string;
        orderId: number;
      }
    >({
      query: (params) => ({
        url: `${ORDER_URL.FIND_ALL}?perPage=${params.perPage}&page=${
          params.page
        }&fromDate=${moment(params.fromDate).format(
          "YYYY-MM-DD"
        )}&toDate=${moment(params.toDate).format("YYYY-MM-DD")}&orderId=${
          params.orderId
        }&description=${params.description}`,
        method: METHOD_TYPES.GET,
        // params,
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
    updateStatus: builder.mutation<void, { _id: string; status: string }>({
      query: (data: { _id: string; status: string }) => ({
        url: ORDER_URL.UPDATE_STATUS,
        method: METHOD_TYPES.PATCH,
        data,
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
  useUpdateStatusMutation,
} = orderApi;
