import { IUserRegister } from "./userRegister";

export interface IUserUpdate extends IUserRegister {
  _id: string;
}
