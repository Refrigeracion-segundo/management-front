import { IEquipmentResponse } from ".";

export interface ISpareRegister {
  description: string;
  suggestedPrice: number;
  name: string;
  equipmentCapacity: string;
  equipmentApplication: string;
  equipmentType: IEquipmentResponse;
}
