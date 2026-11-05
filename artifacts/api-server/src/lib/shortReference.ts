import { isDuplicateKeyError } from "./mongo";
import { ReferenceCounterModel } from "../models/referenceCounter";

export function formatShortReference(
  sequence: number,
  initialLetter = "A",
): string {
  if (
    !Number.isSafeInteger(sequence) ||
    sequence < 1 ||
    !/^[A-Z]$/.test(initialLetter)
  ) {
    throw new Error("A positive sequence and uppercase prefix letter are required.");
  }

  let letters = "";
  let quotient = initialLetter.charCodeAt(0) - 65 + Math.floor((sequence - 1) / 99);
  do {
    letters = String.fromCharCode(65 + (quotient % 26)) + letters;
    quotient = Math.floor(quotient / 26) - 1;
  } while (quotient >= 0);

  return `${letters}${String(((sequence - 1) % 99) + 1).padStart(2, "0")}`;
}

export async function nextShortReference(
  key: string,
  initialLetter = "A",
): Promise<string> {
  const increment = (upsert: boolean) =>
    ReferenceCounterModel.findOneAndUpdate(
      { key },
      { $inc: { sequence: 1 } },
      { ...(upsert ? { upsert: true } : {}), new: true },
    );

  let counter: Awaited<ReturnType<typeof increment>>;
  try {
    counter = await increment(true);
  } catch (error) {
    if (!isDuplicateKeyError(error)) {
      throw error;
    }
    counter = await increment(false);
  }
  if (!counter) {
    throw new Error("A short reference could not be generated.");
  }
  return formatShortReference(counter.sequence, initialLetter);
}
