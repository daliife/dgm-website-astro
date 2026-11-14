import { describe, it, expect } from "vitest";
import { getLocalTimeInfo } from "../../utils/localTime";

describe("getLocalTimeInfo", () => {
  it("formats Barcelona time with the winter zone name", () => {
    // Tue 14 Jan 2025, 09:30 UTC → 10:30 CET
    const info = getLocalTimeInfo(new Date("2025-01-14T09:30:00Z"));
    expect(info.time).toBe("10:30");
    expect(info.zone).toBe("CET");
    expect(info.isWorkingHours).toBe(true);
  });

  it("uses summer time in July", () => {
    // Wed 16 Jul 2025, 16:15 UTC → 18:15 CEST (after hours)
    const info = getLocalTimeInfo(new Date("2025-07-16T16:15:00Z"));
    expect(info.time).toBe("18:15");
    expect(info.zone).toBe("CEST");
    expect(info.isWorkingHours).toBe(false);
  });

  it("is outside working hours at weekends", () => {
    // Sat 18 Jan 2025, 11:00 UTC → 12:00 CET
    expect(
      getLocalTimeInfo(new Date("2025-01-18T11:00:00Z")).isWorkingHours,
    ).toBe(false);
  });

  it("treats midnight as 00, not 24", () => {
    // Tue 14 Jan 2025, 23:05 UTC → 00:05 CET Wed
    expect(getLocalTimeInfo(new Date("2025-01-14T23:05:00Z")).time).toBe(
      "00:05",
    );
  });
});
