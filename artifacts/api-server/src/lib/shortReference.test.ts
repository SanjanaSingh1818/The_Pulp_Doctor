import assert from "node:assert/strict";
import test from "node:test";
import { formatShortReference } from "./shortReference";

test("formats appointment and message references compactly", () => {
  assert.equal(formatShortReference(1), "A01");
  assert.equal(formatShortReference(99), "A99");
  assert.equal(formatShortReference(100), "B01");
  assert.equal(formatShortReference(1, "M"), "M01");
  assert.equal(formatShortReference(100, "M"), "N01");
});

test("rejects invalid compact reference input", () => {
  assert.throws(() => formatShortReference(0));
  assert.throws(() => formatShortReference(1, "m"));
});
