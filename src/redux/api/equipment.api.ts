import { createApi } from "@reduxjs/toolkit/query/react";
import {
  METHOD_TYPES,
  EQUIPMENT_URL,
  ReducerPaths,
  axiosBaseQuery,
} from "../config";
import {
  IDeleteGeneral,
  IEquipmentRegister,
  IEquipmentResponse,
  IEquipmentUpdate,
} from "@/common";

export const equipmentApi = createApi({
  reducerPath: ReducerPaths.EQUIPMENT,
  baseQuery: axiosBaseQuery(),
  tagTypes: ["findAllEquipment"],
  endpoints: (builder) => ({
    registerEquipment: builder.mutation<IEquipmentResponse, IEquipmentRegister>(
      {
        query: (data: IEquipmentRegister) => ({
          url: EQUIPMENT_URL.REGISTER,
          method: METHOD_TYPES.POST,
          data,
        }),
        invalidatesTags: ["findAllEquipment"],
      }
    ),
    findAllEquipment: builder.query<Array<IEquipmentResponse>, void>({
      query: () => ({
        url: EQUIPMENT_URL.FIND_ALL,
        method: METHOD_TYPES.GET,
      }),
      providesTags: ["findAllEquipment"],
    }),
    updateEquipment: builder.mutation<IEquipmentResponse, IEquipmentUpdate>({
      query: (data: IEquipmentUpdate) => ({
        url: EQUIPMENT_URL.UPDATE,
        method: METHOD_TYPES.PATCH,
        data,
      }),
      invalidatesTags: ["findAllEquipment"],
    }),
    deleteEquipment: builder.mutation<IDeleteGeneral, IDeleteGeneral>({
      query: (params: IDeleteGeneral) => ({
        url: EQUIPMENT_URL.DELETE,
        method: METHOD_TYPES.DELETE,
        params,
      }),
      invalidatesTags: ["findAllEquipment"],
    }),
  }),
});

export const {
  useRegisterEquipmentMutation,
  useLazyFindAllEquipmentQuery,
  useUpdateEquipmentMutation,
  useDeleteEquipmentMutation,
} = equipmentApi;
