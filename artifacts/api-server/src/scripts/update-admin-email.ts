import "../lib/loadEnv";
import readline from "node:readline";
import { connectMongo } from "../lib/mongo";
import { AdminUserModel } from "../models/admin";
import { logger } from "../lib/logger";

function ask(label: string): Promise<string> {
  return new Promise((resolve) => {
    const terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    terminal.question(label, (answer) => {
      terminal.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

async function updateAdminEmail(): Promise<void> {
  await connectMongo();
  const currentEmail = await ask("Current administrator email: ");
  const newEmail = await ask("New administrator email: ");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentEmail)) {
    throw new Error("Enter a valid current administrator email.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
    throw new Error("Enter a valid new administrator email.");
  }
  if (currentEmail === newEmail) {
    throw new Error("The new email must differ from the current email.");
  }
  if (await AdminUserModel.exists({ email: newEmail })) {
    throw new Error("An administrator already uses the new email.");
  }

  const updated = await AdminUserModel.findOneAndUpdate(
    { email: currentEmail, active: true, role: "admin" },
    { $set: { email: newEmail } },
    { returnDocument: "after", runValidators: true },
  );
  if (!updated) {
    throw new Error("No active administrator was found for the current email.");
  }
  logger.info("Administrator email updated successfully.");
}

updateAdminEmail()
  .catch((error: unknown) => {
    console.error("Admin email update failed:");

    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Stack:", error.stack);
    } else {
      console.error(error);
    }

    process.exitCode = 1;
  })
  .finally(async () => {
    const mongoose = await import("mongoose");
    await mongoose.default.disconnect();
  });
