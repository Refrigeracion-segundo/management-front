import { IClientResponse, IUserResponse } from ".";

export interface IOrderGeneral {
  _id?: string;
  users?: Array<IUserResponse>;
  report: string;
  startDate?: Date;
  endDate?: Date;
  client?: any;
}
