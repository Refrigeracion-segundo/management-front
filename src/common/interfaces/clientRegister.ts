import { IRegimeResponse } from ".";

export interface IClientRegister {
  name: string;
  contactPerson: string;
  phone: string;
  rfc: string;
  street: string;
  streetNumber: string;
  apartmentNumber: string;
  zipCode: string;
  state?: ICityState | string;
  stateId?: number;
  city?: ICityState | string;
  cityId?: number;
  suburb: string;
  fiscalRegime: string | IRegimeResponse;
}

export interface ICityState {
  id: number;
  name: string;
}
