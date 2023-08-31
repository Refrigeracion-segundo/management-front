import { IOrderRegister } from "./orderRegister";

export interface IOrderResponse extends IOrderRegister {
  _id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
