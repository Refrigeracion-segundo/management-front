export const STATUS_DB = {
  ACTIVE: "active",
  ELIMINATED: "deleted",
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

STATUS.set(STATUS_ORIGINAL.PAID, { color: "#0f1945", translate: "PAGADO" });
STATUS.set(STATUS_ORIGINAL.INVOICED, {
  color: "#a7414a",
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
  color: "#563838",
  translate: "EN PROGRESO",
});
STATUS.set(STATUS_ORIGINAL.CANCELED, { color: "red", translate: "CANCELADA" });

export const STATUS_DATA = new Map<string, { translate: string }>();

STATUS_DATA.set(STATUS_DB.ACTIVE, { translate: "ACTIVO" });
STATUS_DATA.set(STATUS_DB.ELIMINATED, { translate: "BAJA" });
