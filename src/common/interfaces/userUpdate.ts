import { IUserRegister } from "./userRegister";

export interface IUserUpdate extends IUserRegister {
  id: string;
  _id?: string;
}
