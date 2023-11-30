import {
  IClientResponse,
  IEquipmentResponse,
  IOrderDirection,
  IServiceDescriptionResponse,
  IServiceResponse,
  ISpareResponse,
  IUserResponse,
} from ".";

export interface IOrderResponse {
  total: number;
  totalPages: number;
  totalServices: number;
  totalSpare: number;
  page: number;
  perPage: number;
  data: Array<IOrderDataResponse>;
}

export interface IOrderDataResponse extends IOrderDirection {
  _id: string;
  orderId: number;
  startDate?: Date;
  endDate?: Date;
  report: string;
  technicians: Array<IUserResponse>;
  customer: IClientResponse;
  description: string;
  comments?: string;
  services: Array<{
    service: IServiceResponse;
    serviceDescription: IServiceDescriptionResponse;
    equipmentType: IEquipmentResponse;
    brand: string;
    model?: string;
    serie?: string;
    price: number;
    equipmentCapacity?: number;
  }>;
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  spares: Array<{
    spare: ISpareResponse;
    price: number;
    quantity: number;
  }>;
}
