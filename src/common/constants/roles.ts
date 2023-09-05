export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
  TECHNICAL: "TECHNICAL",
};

export const RoleTranslate: Map<string, { key: string; translate: string }> =
  new Map<string, { key: string; translate: string }>();
RoleTranslate.set(ROLES.ADMIN, {
  key: ROLES.ADMIN,
  translate: "ADMINISTRADOR",
});
RoleTranslate.set(ROLES.USER, {
  key: ROLES.USER,
  translate: "USUARIO GENERAL",
});
RoleTranslate.set(ROLES.TECHNICAL, {
  key: ROLES.TECHNICAL,
  translate: "TECNICOS",
});
