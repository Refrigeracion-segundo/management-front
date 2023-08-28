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
  city?: ICityState | string;
  suburb: string;
  fiscalRegime: string | IRegimeResponse;
}

export interface ICityState {
  id: number;
  name: string;
}
