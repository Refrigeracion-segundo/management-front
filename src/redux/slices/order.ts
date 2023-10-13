import {
  IClientResponse,
  IOrderDirection,
  IOrderEquipment,
  IOrderFilters,
  IOrderGeneral,
  IOrderRegister,
  IOrderService,
  IOrderUpdate,
  IServiceResponse,
  ISpareResponse,
  IUserResponse,
} from "@/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { v4 } from "uuid";
export interface Order {
  openDialog: boolean;
  isUpdate: boolean;
  data: IOrderUpdate | IOrderRegister;
  equipment: Array<IOrderEquipment>;
  service: Array<IOrderService>;
  direction: IOrderDirection;
  users: Array<IUserResponse>;
  client: IClientResponse;
  general: IOrderGeneral;
  total: number;
  filters: IOrderFilters;
  spares: Array<ISpareResponse & { quantity: number }>;
  numberOrder?: number;
}

const initialState: Order = {
  openDialog: false,
  isUpdate: false,
  data: {
    dateInit: new Date(),
    dateFinish: new Date(),
    client: "",
    description: "",
    comments: "",
    tech: [],
  },
  equipment: [],
  service: [],
  direction: {
    street: "",
    streetNumber: "",
    apartmentNumber: "",
    zipCode: "",
    suburb: "",
    city: "",
    cityId: 0,
    state: "",
    stateId: 0,
  },
  users: [],
  client: {
    _id: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "",
    name: "",
    contactPerson: "",
    phone: "",
    rfc: "",
    street: "",
    streetNumber: "",
    apartmentNumber: "",
    zipCode: "",
    suburb: "",
    fiscalRegime: "",
  },
  general: {
    users: [],
    report: "",
    client: "",
    startDate: new Date(moment().startOf("month").format()),
    endDate: new Date(moment().endOf("month").format()),
    description: "",
  },
  total: 0,
  filters: {
    orderId: 0,
    search: "",
    filter: "description",
    fromDate: new Date(moment().startOf("month").format()),
    toDate: new Date(moment().endOf("month").format()),
  },
  spares: [],
  numberOrder: undefined,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    openOrder: (state) => {
      return {
        ...state,
        openDialog: true,
      };
    },
    closeOrder: (state) => {
      // console.log(state.isUpdate);
      if (state.isUpdate) {
        return {
          ...state,
          ...initialState,
        };
      } else state.openDialog = false;
    },
    isUpdatingOrder: (state, value: PayloadAction<boolean>) => {
      return {
        ...state,
        isUpdate: value.payload,
      };
    },
    saveOrder: (state, value: PayloadAction<IOrderUpdate | IOrderRegister>) => {
      return {
        ...state,
        data: value.payload,
        isUpdate: true,
        openDialog: true,
      };
    },
    clearOrder: (state) => {
      return {
        ...initialState,
      };
    },
    pushOrderEquipment: (state, value: PayloadAction<IOrderEquipment>) => {
      state.equipment = [...state.equipment, { ...value.payload, _id: v4() }];
    },
    deleteOrderEquipment: (state, value: PayloadAction<string>) => {
      state.equipment = state.equipment.filter((p) => p._id !== value.payload);
    },
    pushOrderService: (state, value: PayloadAction<IOrderService>) => {
      state.service = [...state.service, { ...value.payload }];
      let aux = 0;
      state.service.forEach((p) => {
        aux += (p.service.service as IServiceResponse).suggestedPrice;
      });
      state.total = aux;
    },
    deleteOrderService: (state, value: PayloadAction<number>) => {
      state.service = state.service.filter(
        (_, index) => index !== value.payload
      );
      let aux = 0;
      state.service.forEach((p) => {
        aux += (p.service.service as IServiceResponse).suggestedPrice;
      });
      state.total = aux;
    },
    updateOrderService: (
      state,
      value: PayloadAction<{ index: number; price: number }>
    ) => {
      state.service = state.service.map((p, index) => {
        if (index == value.payload.index)
          return {
            ...p,
            service: {
              ...p.service,
              service: {
                ...(p.service.service as IServiceResponse),
                suggestedPrice: value.payload.price,
              },
            },
          };
        return {
          ...p,
        };
      });
      let aux = 0;
      state.service.forEach((p) => {
        aux += (p.service.service as IServiceResponse).suggestedPrice;
      });
      state.total = aux;
    },
    saveDirection: (state, value: PayloadAction<IOrderDirection>) => {
      state.direction = value.payload;
    },
    orderUsers: (state, value: PayloadAction<Array<IUserResponse>>) => {
      state.users = [...value.payload];
    },
    saveOrderClient: (state, value: PayloadAction<IClientResponse>) => {
      state.client = value.payload;
    },
    saveOrderGeneral: (state, value: PayloadAction<IOrderGeneral>) => {
      state.general = value.payload;
    },
    saveTechnician: (state, value: PayloadAction<Array<IUserResponse>>) => {
      state.users = value.payload;
    },
    saveEquipment: (state, value: PayloadAction<Array<IOrderEquipment>>) => {
      state.equipment = value.payload;
    },
    saveFilters: (state, value: PayloadAction<IOrderFilters>) => {
      state.filters = value.payload;
    },
    cleanReduxOrder: (state) => {
      return {
        ...initialState,
        client: initialState.client,
        numberOrder: undefined,
      };
    },
    deleteAllEquipment: (state) => {
      state.equipment = [];
    },
    deleteAllServices: (state) => {
      state.service = [];
      state.total = 0;
    },
    pushSpareOrder: (
      state,
      value: PayloadAction<ISpareResponse & { quantity: number }>
    ) => {
      state.spares = [...state.spares, value.payload];
    },
    deleteOneSpareOrder: (state, value: PayloadAction<number>) => {
      state.spares = state.spares.filter((_, i) => i !== value.payload);
    },
    deleteAllSparesOrder: (state) => {
      state.spares = [];
    },
    updateSpareOrder: (
      state,
      value: PayloadAction<{ _id: string; quantity: number; price: number }>
    ) => {
      state.spares = state.spares.map((spare) => {
        if (spare._id == value.payload._id) {
          return {
            ...spare,
            suggestedPrice: value.payload.price,
            quantity: value.payload.quantity,
          };
        }
        return spare;
      });
    },
    saveNumOrder: (state, value: PayloadAction<number>) => {
      state.numberOrder = value.payload;
    },
  },
});

export const {
  openOrder,
  closeOrder,
  isUpdatingOrder,
  saveOrder,
  clearOrder,
  pushOrderEquipment,
  deleteOrderEquipment,
  pushOrderService,
  deleteOrderService,
  saveDirection,
  orderUsers,
  saveOrderClient,
  saveOrderGeneral,
  updateOrderService,
  saveTechnician,
  saveEquipment,
  saveFilters,
  cleanReduxOrder,
  deleteAllEquipment,
  deleteAllServices,
  pushSpareOrder,
  deleteOneSpareOrder,
  deleteAllSparesOrder,
  updateSpareOrder,
  saveNumOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
