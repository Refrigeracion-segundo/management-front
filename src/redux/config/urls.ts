const URL_DEFAULT = "http://localhost:3333/v1";

export const enum LOGIN_URL {
  LOGIN = "/auth/login",
}

export const enum ROLES_URL {
  REGISTER = "",
  FIND_ALL = "",
  UPDATE = "",
  DELETE = "",
}

export const enum CLIENTS_URL {
  REGISTER = "/customer",
  FIND_ALL = "/customer",
  UPDATE = "/customer",
  DELETE = "/customer",
}

export const enum USER_URL {
  REGISTER = "/user",
  FIND_ALL = "/user",
  UPDATE = "/user",
  DELETE = "/user",
  FIND_TECH = "/user/role",
}

export const enum EQUIPMENT_URL {
  REGISTER = "/equipment-type",
  FIND_ALL = "/equipment-type",
  UPDATE = "/equipment-type",
  DELETE = "/equipment-type",
}

export const enum FISCAL_REGIME_URL {
  REGISTER = "/fiscal-regime",
  FIND_ALL = "/fiscal-regime",
  UPDATE = "/fiscal-regime",
  DELETE = "/fiscal-regime",
}

export const enum SERVICE_URL {
  REGISTER = "/service",
  FIND_ALL = "/service",
  UPDATE = "/service",
  DELETE = "/service",
}

export const enum COUNTRY_URL {
  GET_COUNTRIES = "/countries-states-cities/countries",
  GET_STATES = "/countries-states-cities/states",
  GET_CITIES = "/countries-states-cities/cities",
}

export const enum SERVICE_DESCRIPTION_URL {
  REGISTER = "/service/description",
  FIND_ALL = "/service/description/all",
  UPDATE = "/service/description",
  DELETE = "/service/description",
}

export const enum SPARE_URL {
  REGISTER = "/spare",
  FIND_ALL = "/spare",
  UPDATE = "/spare",
  DELETE = "/spare",
}

export const enum ORDER_URL {
  REGISTER = "/order",
  FIND_ALL = "/order",
  UPDATE = "/order",
  DELETE = "/order",
  UPDATE_STATUS = "/order/status",
}

export const enum DASHBOARD_URL {
  TOTAL = "/dashboard/totals",
  ORDERS = "/dashboard/orders",
  TECHNICIANS = "/dashboard/technicians",
}
