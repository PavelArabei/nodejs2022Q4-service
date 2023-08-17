import { MyLoggingService } from "@app/logging/logging.service";

export const catchUncaughtException = (myLoggingService: MyLoggingService): void => {
  process.on("uncaughtException", (error: Error) => {
    const errorMessage = `Uncaught Exception: ${error.message}`;
    myLoggingService.error(errorMessage, error.stack);
    process.exit(1);
  });
};