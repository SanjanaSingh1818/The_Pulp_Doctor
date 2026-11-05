export function formatAppointmentReference(sequence: number): string {
  if (!Number.isSafeInteger(sequence) || sequence < 1) {
    throw new Error("Appointment sequence must be a positive safe integer.");
  }

  let letters = "";
  let quotient = Math.floor((sequence - 1) / 99);
  do {
    letters = String.fromCharCode(65 + (quotient % 26)) + letters;
    quotient = Math.floor(quotient / 26) - 1;
  } while (quotient >= 0);

  const number = ((sequence - 1) % 99) + 1;
  return `${letters}${String(number).padStart(2, "0")}`;
}
