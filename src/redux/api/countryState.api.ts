import { createApi } from "@reduxjs/toolkit/query/react";
import {
  METHOD_TYPES,
  COUNTRY_URL,
  ReducerPaths,
  axiosBaseQuery,
} from "../config";
import {
  IDeleteGeneral,
  IRegimeRegister,
  IAddressResponse,
  IRegimeUpdate,
} from "@/common";

export const countryStateApi = createApi({
  reducerPath: ReducerPaths.COUNTRY_STATE,
  baseQuery: axiosBaseQuery(),

  endpoints: (builder) => ({
    findState: builder.query<IAddressResponse, string>({
      query: (params) => ({
        url: `${COUNTRY_URL.GET_STATES}?country=142&name=${params}&page=1`,
        method: METHOD_TYPES.GET,
        // query: { name: params, page: 1, countryKey: 142 },
      }),
    }),
    findCountry: builder.query<IAddressResponse, void>({
      query: () => ({
        url: COUNTRY_URL.GET_COUNTRIES,
        method: METHOD_TYPES.GET,
      }),
    }),
    findCities: builder.query<
      IAddressResponse,
      { stateId: number; name: string }
    >({
      query: (data) => ({
        url: `${COUNTRY_URL.GET_CITIES}?country=142&state=${data.stateId}&name=${data.name}&page=1`,
        method: METHOD_TYPES.GET,
      }),
    }),
  }),
});

export const {
  useLazyFindCountryQuery,
  useLazyFindStateQuery,
  useLazyFindCitiesQuery,
} = countryStateApi;
