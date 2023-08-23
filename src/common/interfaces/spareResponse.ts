import { ISpareRegister } from "./spareRegister";

export interface ISpareResponse extends ISpareRegister {
  _id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
