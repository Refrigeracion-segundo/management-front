import { IEquipmentResponse } from ".";

export interface IOrderEquipment {
  _id?: string;
  equipment: IEquipmentResponse;
  brand: string;
  model?: string;
  serie?: string;
  capacity?: number;
}
