import { IUserRegister } from "./userRegister";

export interface IUserResponse extends IUserRegister {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}
