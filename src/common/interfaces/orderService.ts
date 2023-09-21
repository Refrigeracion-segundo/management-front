import { IOrderEquipment, IServiceDescriptionResponse } from ".";

export interface IOrderService {
  service: IServiceDescriptionResponse;
  equipment: IOrderEquipment;
}
