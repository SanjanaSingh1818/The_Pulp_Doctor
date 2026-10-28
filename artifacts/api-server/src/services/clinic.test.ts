import assert from "node:assert/strict";
import test from "node:test";
import { isClinicSlotPast } from "./clinic";

test("clinic slot expiry uses the complete local date and time in Asia/Kolkata", () => {
  const now = new Date("2026-04-04T10:30:00.000Z");

  assert.equal(isClinicSlotPast("2026-04-03", "23:00", now), true);
  assert.equal(isClinicSlotPast("2026-04-04", "15:59", now), true);
  assert.equal(isClinicSlotPast("2026-04-04", "16:00", now), false);
  assert.equal(isClinicSlotPast("2026-04-04", "16:30", now), false);
  assert.equal(isClinicSlotPast("2026-04-05", "09:00", now), false);
});
