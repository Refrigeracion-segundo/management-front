import { IRegimeRegister } from "./regimeRegister";

export interface IRegimeResponse extends IRegimeRegister {
  _id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
