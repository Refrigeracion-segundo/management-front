import { IEquipmentRegister } from "./equipmentRegister";

export interface IEquipmentResponse extends IEquipmentRegister {
  _id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
