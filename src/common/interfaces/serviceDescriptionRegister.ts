import { IServiceResponse } from ".";

export interface IServiceDescriptionRegister {
  description: string;
  service: IServiceResponse | string;
}
