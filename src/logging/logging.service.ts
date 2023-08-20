import { Injectable, Logger } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import { appRoot } from "@app/main";

@Injectable()
export class MyLoggingService {
  private logger: Logger;


  constructor() {
    this.logger = new Logger();
  }

  log(message: string) {
    const color = this.getColorCode("blue");
    this.logger.log(`${color}${message}`);
    this.writeToFile(message, this.logPath);
  }

  error(message: string, trace?: string, context?: string) {
    const color = this.getColorCode("red");
    this.logger.error(`${color}${message}`, `${color}${trace}`, context);
    this.writeToFile(`${message} ${trace}`, this.errPath);
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, context);
    this.writeToFile(message, this.logPath);
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, context);
    this.writeToFile(message, this.logPath);
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, context);
    this.writeToFile(message, this.logPath);
  }

  private getColorCode(color: string): string {
    const colorCodes = {
      reset: "\x1b[0m",
      red: "\x1b[31m",
      green: "\x1b[32m",
      yellow: "\x1b[33m",
      blue: "\x1b[34m",
      gray: "\x1b[90m"
    };
    return colorCodes[color] || colorCodes.reset;
  }

  private get folderPath() {
    return path.join(appRoot, "..", "logs");
  }

  private get logPath() {
    return path.join(this.folderPath, "app.log");
  }

  private get errPath() {
    return path.join(this.folderPath, "err.log");
  }


  private async writeToFile(message, pathToFile) {
    const errorMessage = `${new Date().toISOString()} - ${message}\n`;
    const writeStream = fs.createWriteStream(pathToFile, { flags: "a" });

    writeStream.write(errorMessage);
    writeStream.end();

    writeStream.on("error", (err) => {
      console.error("Error writing to file:", err);
    });
  }


}