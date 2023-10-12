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
        orderId?: number;
        filter?: string;
        search?: string;
      }
    >({
      query: (params) => ({
        url: `${ORDER_URL.FIND_ALL}?${getFilters(params)}`,
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
    verifyOrderKey: builder.query<void, number>({
      query: (data) => ({
        url: `${ORDER_URL.VERIFY_ORDER}/${data}`,
        method: METHOD_TYPES.GET,
      }),
    }),
  }),
});

const getFilters = (filters: any) => {
  let query = "";
  for (const key in filters) {
    if (key == "fromDate" || key == "toDate")
      query += `${key}=${moment(filters[key]).format("YYYY-MM-DD")}&`;
    else query += `${key}=${filters[key]}&`;
  }

  return query.substring(0, query.length - 1);
};
export const {
  useRegisterOrderMutation,
  useLazyFindAllOrderQuery,
  useFindAllOrderQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useUpdateStatusMutation,
  useLazyVerifyOrderKeyQuery,
} = orderApi;
