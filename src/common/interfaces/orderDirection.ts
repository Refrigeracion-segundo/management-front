import { ICityState } from ".";

export interface IOrderDirection {
  street: string;
  streetNumber: string;
  apartmentNumber: string;
  zipCode: string;
  state?: ICityState | string;
  stateId?: number;

  city?: ICityState | string;
  cityId?: number;
  suburb: string;
}
