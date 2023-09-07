import { STATUS_ORIGINAL } from "@/redux/constants";

export interface IDashboardHeaderResponse {
  [key: string]: { total: number; amount: number };
}
export interface IDashboardHeader extends IDashboardHeaderResponse {
  [STATUS_ORIGINAL.PAID]: { total: number; amount: number };
  [STATUS_ORIGINAL.PAID_INVOICED]: { total: number; amount: number };
  [STATUS_ORIGINAL.PENDING]: { total: number; amount: number };
  [STATUS_ORIGINAL.CANCELED]: { total: number; amount: number };
  [STATUS_ORIGINAL.INVOICED]: { total: number; amount: number };
  [STATUS_ORIGINAL.IN_PROGRESS]: { total: number; amount: number };
  total: { total: number; amount: number };
}
