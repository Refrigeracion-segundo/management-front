import {
  IOrderEquipment,
  IServiceDescriptionResponse,
  IServiceResponse,
} from ".";

export interface IOrderService {
  service: IServiceResponse;
  svcDescription: IServiceDescriptionResponse;
  equipment: IOrderEquipment;
}
