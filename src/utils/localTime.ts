/** Barcelona observes Europe/Madrid time. */
export const CONTACT_TIME_ZONE = "Europe/Madrid";

const WORK_START_HOUR = 9;
const WORK_END_HOUR = 18;
const WEEKEND = new Set(["Sat", "Sun"]);

export interface LocalTimeInfo {
  /** 24h "HH:mm". */
  time: string;
  /** Short zone name, e.g. "CET" / "CEST". */
  zone: string;
  /** Monday–Friday, 09:00–17:59 local time. */
  isWorkingHours: boolean;
}

export function getLocalTimeInfo(
  date: Date,
  timeZone: string = CONTACT_TIME_ZONE,
): LocalTimeInfo {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZoneName: "short",
  }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const hour = Number(part("hour"));
  return {
    time: `${part("hour")}:${part("minute")}`,
    zone: part("timeZoneName"),
    isWorkingHours:
      !WEEKEND.has(part("weekday")) &&
      hour >= WORK_START_HOUR &&
      hour < WORK_END_HOUR,
  };
}
