export interface IOrderFilters {
  orderId: number;
  description: string;
  fromDate: Date;
  toDate: Date;
  status?: string;
  filter?: string;
  search?: string;
}
