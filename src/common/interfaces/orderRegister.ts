import { ICityState, IClientResponse, IUserResponse } from ".";

export interface IOrderRegister {
  dateInit: Date;
  dateFinish: Date;
  direction?: {
    street: string;
    streetNumber: string;
    apartmentNumber: string;
    zipCode: string;
    state?: ICityState | string;
    city?: ICityState | string;
    suburb: string;
  };
  client: IClientResponse | string;
  description: string;
  observation: string;
  tech: Array<string | IUserResponse>;
}
