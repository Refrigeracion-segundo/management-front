import { createApi } from "@reduxjs/toolkit/query/react";
import {
  METHOD_TYPES,
  ReducerPaths,
  axiosBaseQuery,
  DASHBOARD_URL,
} from "../config";
import { IAddressResponse, IDashboardHeader } from "@/common";

export const dashboardApi = createApi({
  reducerPath: ReducerPaths.DASHBOARD,
  baseQuery: axiosBaseQuery(),

  endpoints: (builder) => ({
    findTotal: builder.query<
      IDashboardHeader,
      { fromDate: Date; toDate: Date; status: string }
    >({
      query: (params) => ({
        url: `${DASHBOARD_URL.TOTAL}?fromDate=${params.fromDate}&toDate=${params.toDate}&status=${params.status}`,
        method: METHOD_TYPES.GET,
      }),
    }),
    findOrders: builder.query<IAddressResponse, void>({
      query: () => ({
        url: DASHBOARD_URL.ORDERS,
        method: METHOD_TYPES.GET,
      }),
    }),
    findTechnicians: builder.query<IAddressResponse, void>({
      query: (data) => ({
        url: DASHBOARD_URL.TECHNICIANS,
        method: METHOD_TYPES.GET,
      }),
      keepUnusedDataFor: 1,
    }),
  }),
});

export const {
  useLazyFindOrdersQuery,
  useFindOrdersQuery,
  useLazyFindTotalQuery,
  useFindTotalQuery,
  useLazyFindTechniciansQuery,
  useFindTechniciansQuery,
} = dashboardApi;
