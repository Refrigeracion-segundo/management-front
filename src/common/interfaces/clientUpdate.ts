import { IClientRegister } from "./clientRegister";

export interface IClientUpdate extends IClientRegister {
  _id: string;
}
