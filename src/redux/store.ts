import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/login";
import dialogUser from "./slices/dialogUser";
import sliderReducer from "./slices/slider";
import dialogSpare from "./slices/dialogSpare";
import dialogClient from "./slices/dialogClient";
import dialogEquipment from "./slices/dialogEquipment";
import fiscalRegime from "./slices/fiscalRegime";
import { clientsApi, loginApi, spareApi, userApi } from "./api";
import { setupAxiosTokenInterceptor } from "@/app/interceptor/interceptor";
import { equipmentApi } from "./api/equipment.api";
import { fiscalRegimeApi } from "./api/fiscalRegime";
import service from "./slices/service";
import { serviceApi } from "./api/services.api";
import { countryStateApi } from "./api/countryState.api";
import { serviceDescriptionApi } from "./api/serviceDescription.api";
import serviceDescription from "./slices/serviceDescription";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    dialogUser: dialogUser,
    slider: sliderReducer,
    dialogSpare: dialogSpare,
    dialogClient: dialogClient,
    equipment: dialogEquipment,
    fiscalRegime: fiscalRegime,
    service: service,
    serviceDescription: serviceDescription,
    [userApi.reducerPath]: userApi.reducer,
    [equipmentApi.reducerPath]: equipmentApi.reducer,
    [fiscalRegimeApi.reducerPath]: fiscalRegimeApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [countryStateApi.reducerPath]: countryStateApi.reducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [serviceDescriptionApi.reducerPath]: serviceDescriptionApi.reducer,
    [spareApi.reducerPath]: spareApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      equipmentApi.middleware,
      fiscalRegimeApi.middleware,
      serviceApi.middleware,
      countryStateApi.middleware,
      clientsApi.middleware,
      loginApi.middleware,
      serviceDescriptionApi.middleware,
      spareApi.middleware
    ),
});
export type RootState = ReturnType<typeof store.getState>;
setupAxiosTokenInterceptor(store);
export type AppDispatch = typeof store.dispatch;
