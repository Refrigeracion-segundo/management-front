import { IServiceDescriptionRegister } from "./serviceDescriptionRegister";

export interface IServiceDescriptionResponse
  extends IServiceDescriptionRegister {
  _id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
