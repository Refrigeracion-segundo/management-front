import { IServiceDescriptionRegister } from "./serviceDescriptionRegister";

export interface IServiceDescriptionUpdate extends IServiceDescriptionRegister {
  _id: string;
}
