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
    description: ""
  },
  total: 0,
  filters: {
    orderId: 0,
    description: "",
    fromDate: new Date(moment().startOf("month").format()),
    toDate: new Date(moment().endOf("month").format()),
  },
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
      return {
        ...state,
        openDialog: false,
        // isUpdate: false,
        // data: initialState.data,
        // general: initialState.general,
        // client: initialState.client,
        // direction: initialState.direction,
        // equipment: initialState.equipment,
        // service: initialState.service,
        // users: initialState.users
      };
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
    deleteOrderEquipment: (state, value: PayloadAction<number>) => {
      state.equipment = state.equipment.filter(
        (p, index) => index !== value.payload
      );
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
      state = { ...initialState };
    },
    deleteAllEquipment: (state) => {
      state.equipment = [];
    },
    deleteAllServices: (state) => {
      state.service = [];
      state.total = 0;
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
} = orderSlice.actions;

export default orderSlice.reducer;
