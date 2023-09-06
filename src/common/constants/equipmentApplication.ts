export const APPLICACTION_TYPE = {
  COOL_ROOM: "COOL_ROOM",
  AIR_CONDITIONING: "AIR_CONDITIONING",
};

export const ApplicationTypeTranslate: Map<
  string,
  { key: string; translate: string }
> = new Map<string, { key: string; translate: string }>();
ApplicationTypeTranslate.set(APPLICACTION_TYPE.COOL_ROOM, {
  key: APPLICACTION_TYPE.COOL_ROOM,
  translate: "CUARTO FRIO",
});
ApplicationTypeTranslate.set(APPLICACTION_TYPE.AIR_CONDITIONING, {
  key: APPLICACTION_TYPE.AIR_CONDITIONING,
  translate: "AIRE ACONDICIONADO",
});
