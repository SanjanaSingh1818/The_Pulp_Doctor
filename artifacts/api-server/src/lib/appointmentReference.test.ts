import assert from "node:assert/strict";
import test from "node:test";
import { formatAppointmentReference } from "./appointmentReference";

test("formats appointment IDs as a letter and two digits", () => {
  assert.equal(formatAppointmentReference(1), "A01");
  assert.equal(formatAppointmentReference(99), "A99");
  assert.equal(formatAppointmentReference(100), "B01");
  assert.equal(formatAppointmentReference(2600), "AA26");
});

test("rejects invalid appointment sequences", () => {
  assert.throws(() => formatAppointmentReference(0));
  assert.throws(() => formatAppointmentReference(1.5));
});
