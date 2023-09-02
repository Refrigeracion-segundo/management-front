import {
  IOrderEquipment,
  IServiceDescriptionResponse,
  IServiceResponse,
} from ".";

export interface IOrderService {
  service: IServiceDescriptionResponse;
  equipment: IOrderEquipment;
}
