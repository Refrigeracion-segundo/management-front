export const STATUS_DB = {
  ACTIVE: "active",
  ELIMINATED: "eliminated",
};
export enum STATUS_ORIGINAL {
  PENDING = "pending",
  IN_PROGRESS = "in progress",
  INVOICED = "invoiced",
  PAID = "paid",
  FINISHED = "finished",
  CANCELED = "canceled",
}
export const STATUS = new Map<string, { color: string; translate: string }>();

STATUS.set(STATUS_ORIGINAL.PAID, { color: "#a7414a", translate: "PAGADO" });
STATUS.set(STATUS_ORIGINAL.INVOICED, {
  color: "#282726",
  translate: "FACTURADO",
});
STATUS.set(STATUS_ORIGINAL.FINISHED, {
  color: "#6a8a82",
  translate: "TERMINADO",
});
STATUS.set(STATUS_ORIGINAL.PENDING, {
  color: "#a37c27",
  translate: "PENDIENTE",
});
STATUS.set(STATUS_ORIGINAL.IN_PROGRESS, {
  color: "#282726",
  translate: "EN PROGRESO",
});
STATUS.set(STATUS_ORIGINAL.CANCELED, { color: "red", translate: "CANCELADA" });
