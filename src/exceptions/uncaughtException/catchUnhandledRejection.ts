import { MyLoggingService } from "@app/logging/logging.service";

export const catchUnhandledRejection = (myLoggingService: MyLoggingService): void => {
  process.on("unhandledRejection", (reason: unknown) => {
    const errorMessage = `Unhandled Rejection: ${reason instanceof Error ? reason.message : JSON.stringify(reason)}`;
    myLoggingService.error(errorMessage);
  });
};