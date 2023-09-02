import { IClientResponse, IUserResponse } from ".";

export interface IOrderGeneral {
  users?: Array<IUserResponse>;
  report: string;
  startDate?: Date;
  endDate?: Date;
  client?: any;
}
