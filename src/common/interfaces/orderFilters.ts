export interface IOrderFilters {
  orderId: number;
  fromDate: Date;
  toDate: Date;
  status?: string;
  filter?: string;
  search?: string;
}
