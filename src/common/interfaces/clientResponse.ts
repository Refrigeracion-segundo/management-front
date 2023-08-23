import { IClientRegister } from "./clientRegister";

export interface IClientResponse extends IClientRegister {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  deletedAt?: Date;
}
