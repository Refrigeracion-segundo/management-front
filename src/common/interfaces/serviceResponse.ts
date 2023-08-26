import { IEquipmentResponse } from ".";
import { IServiceRegister } from "./serviceRegister";

export interface IServiceResponse extends IServiceRegister {
  _id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
