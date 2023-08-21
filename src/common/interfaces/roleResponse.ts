import { IRoleRegister } from "./roleRegister";

export interface IRoleResponse extends IRoleRegister {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
