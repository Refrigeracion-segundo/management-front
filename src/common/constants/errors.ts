export const enum HttpError {
  CUSTOMER_ALREADY_EXIST = "CUSTOMER_ALREADY_EXIST",
  CUSTOMER_NOT_FOUND = "CUSTOMER_NOT_FOUND",
  CUSTOMER_ALREADY_DELETED = "CUSTOMER_ALREADY_DELETED",
  CUSTOMER_ALREADY_ACTIVATE = "CUSTOMER_ALREADY_ACTIVATE",
  EQUIPMENT_TYPE_ALREADY_EXIST = "EQUIPMENT_TYPE_ALREADY_EXIST",
  EQUIPMENT_TYPE_NOT_FOUND = "EQUIPMENT_TYPE_NOT_FOUND",
  EQUIPMENT_TYPE_ALREADY_DELETED = "EQUIPMENT_TYPE_ALREADY_DELETED",
  EQUIPMENT_TYPE_ALREADY_ACTIVATE = "EQUIPMENT_TYPE_ALREADY_ACTIVATE",
  FISCAL_REGIME_ALREADY_EXIST = "FISCAL_REGIME_ALREADY_EXIST",
  FISCAL_REGIME_NOT_FOUND = "FISCAL_REGIME_NOT_FOUND",
  FISCAL_REGIME_ALREADY_DELETED = "FISCAL_REGIME_ALREADY_DELETED",
  ORDER_ALREADY_EXIST = "ORDER_ALREADY_EXIST",
  ORDER_NOT_FOUND = "ORDER_NOT_FOUND",
  ORDER_ALREADY_CANCELED = "ORDER_ALREADY_CANCELED",
  ORDER_ID_GREATER_THAN_SEQUENCE = "ORDER_ID_GREATER_THAN_SEQUENCE",
  SERVICE_ALREADY_EXIST = "SERVICE_ALREADY_EXIST",
  SERVICE_NOT_FOUND = "SERVICE_NOT_FOUND",
  SERVICE_ALREADY_DELETED = "SERVICE_ALREADY_DELETED",
  SERVICE_ALREADY_ACTIVATE = "SERVICE_ALREADY_ACTIVATE",
  SERVICE_DESCRIPTION_ALREADY_EXIST = "SERVICE_DESCRIPTION_ALREADY_EXIST",
  SERVICE_DESCRIPTION_NOT_FOUND = "SERVICE_DESCRIPTION_NOT_FOUND",
  SERVICE_DESCRIPTION_ALREADY_DELETED = "SERVICE_DESCRIPTION_ALREADY_DELETED",
  SERVICE_DESCRIPTION_ALREADY_ACTIVATE = "SERVICE_DESCRIPTION_ALREADY_ACTIVATE",
  SPARE_ALREADY_EXIST = "SPARE_ALREADY_EXIST",
  SPARE_NOT_FOUND = "SPARE_NOT_FOUND",
  SPARE_ALREADY_DELETED = "SPARE_ALREADY_DELETED",
  SPARE_ALREADY_ACTIVATE = "SPARE_ALREADY_ACTIVATE",
  EMAIL_ALREADY_EXIST = "EMAIL_ALREADY_EXIST",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  USER_ALREADY_DELETED = "USER_ALREADY_DELETED",
  USER_ALREADY_ACTIVATE = "USER_ALREADY_ACTIVATE",
}

export const ErrorsTranslate: Map<HttpError, string> = new Map<
  HttpError,
  string
>();
ErrorsTranslate.set(HttpError.CUSTOMER_ALREADY_EXIST, "Este cliente ya existe");
ErrorsTranslate.set(HttpError.CUSTOMER_NOT_FOUND, "Cliente no encontrado");
ErrorsTranslate.set(
  HttpError.CUSTOMER_ALREADY_DELETED,
  "Este cliente ya a sido eliminado"
);
ErrorsTranslate.set(
  HttpError.CUSTOMER_ALREADY_ACTIVATE,
  "Este cliente ya a sido dado de alta"
);
ErrorsTranslate.set(
  HttpError.EQUIPMENT_TYPE_ALREADY_EXIST,
  "Este tipo de equipo ya existe"
);
ErrorsTranslate.set(
  HttpError.EQUIPMENT_TYPE_NOT_FOUND,
  "Este equipo no se encuentro"
);
ErrorsTranslate.set(
  HttpError.EQUIPMENT_TYPE_ALREADY_DELETED,
  "Este equipo ya a sido eliminado"
);
ErrorsTranslate.set(
  HttpError.EQUIPMENT_TYPE_ALREADY_ACTIVATE,
  "Este equipo ya a sido dado de alta"
);
ErrorsTranslate.set(
  HttpError.FISCAL_REGIME_ALREADY_EXIST,
  "Este regimen fiscal ya existe"
);
ErrorsTranslate.set(
  HttpError.FISCAL_REGIME_NOT_FOUND,
  "No se a encontrado el regimen fiscal"
);
ErrorsTranslate.set(
  HttpError.FISCAL_REGIME_ALREADY_DELETED,
  "Este regimen fiscal ya a sido eliminado"
);
ErrorsTranslate.set(HttpError.ORDER_ALREADY_EXIST, "Esta orden ya existe");
ErrorsTranslate.set(HttpError.ORDER_NOT_FOUND, "La orden no a sido encontrada");
ErrorsTranslate.set(
  HttpError.ORDER_ALREADY_CANCELED,
  "Esta orden ya a sido cancelada"
);
ErrorsTranslate.set(
  HttpError.ORDER_ID_GREATER_THAN_SEQUENCE,
  "El numero de orden no es valido"
);
ErrorsTranslate.set(HttpError.SERVICE_ALREADY_EXIST, "Este servicio ya existe");
ErrorsTranslate.set(
  HttpError.SERVICE_NOT_FOUND,
  "Este servicio no a sido encontrado"
);
ErrorsTranslate.set(
  HttpError.SERVICE_ALREADY_DELETED,
  "Este servicio ya a sido eliminado"
);
ErrorsTranslate.set(
  HttpError.SERVICE_ALREADY_ACTIVATE,
  "Este servicio ya a sido dado de alta"
);
ErrorsTranslate.set(
  HttpError.SERVICE_DESCRIPTION_ALREADY_EXIST,
  "Esta descripción del servicio ya existe"
);
ErrorsTranslate.set(
  HttpError.SERVICE_DESCRIPTION_NOT_FOUND,
  "Esta descripción del servicio no a sido encontrada"
);
ErrorsTranslate.set(
  HttpError.SERVICE_DESCRIPTION_ALREADY_DELETED,
  "Esta descripción del servicio ya a sido eliminada"
);
ErrorsTranslate.set(
  HttpError.SERVICE_DESCRIPTION_ALREADY_ACTIVATE,
  "Esta descripción del servicio ya a sido dada de alta"
);
ErrorsTranslate.set(HttpError.SPARE_ALREADY_EXIST, "Esta refacción ya existe");
ErrorsTranslate.set(
  HttpError.SPARE_NOT_FOUND,
  "Esta refacción no a sido encontrada"
);
ErrorsTranslate.set(
  HttpError.SPARE_ALREADY_DELETED,
  "Esta refacción ya a sido eliminada"
);
ErrorsTranslate.set(
  HttpError.SPARE_ALREADY_ACTIVATE,
  "Esta refacción ya a sido dada de alta"
);
ErrorsTranslate.set(
  HttpError.EMAIL_ALREADY_EXIST,
  "Este correo electrónico ya existe"
);
ErrorsTranslate.set(
  HttpError.USER_NOT_FOUND,
  "Este usuario no a sido encontrado"
);
ErrorsTranslate.set(
  HttpError.USER_ALREADY_DELETED,
  "Este usuario ya a sido eliminado"
);
ErrorsTranslate.set(
  HttpError.USER_ALREADY_ACTIVATE,
  "Este usuario ya a sido dado de alta"
);
