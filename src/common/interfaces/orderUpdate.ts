import { IOrderRegister } from "./orderRegister";

export interface IOrderUpdate extends IOrderRegister {
  _id: string;
}
