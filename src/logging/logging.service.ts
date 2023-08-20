import { Injectable, Logger } from "@nestjs/common";
import { join } from "path";
import { createWriteStream, readdir, statSync, WriteStream } from "fs";
import { appRoot } from "@app/main";
import { LogAndError } from "@app/logging/types/logAndError";
import * as process from "process";


@Injectable()
export class MyLoggingService {
  private logger: Logger;
  private logFileStream: WriteStream;
  private errorFileStream: WriteStream;
  private readonly maxSize: number;
  private readonly logLevel: number;


  constructor() {
    this.logger = new Logger();
    const { LOG_FILE_SIZE, LOG_LEVEL } = process.env;
    this.maxSize = +LOG_FILE_SIZE;
    this.logLevel = +LOG_LEVEL;

    this.rotateFile(this.logFileStream, "log");
    this.rotateFile(this.errorFileStream, "err");
  }

  log(message: string) {
    if (this.logLevel > 2) return;
    const color = this.getColorCode("blue");
    this.logger.log(`${color}${message}`);

    this.logFileStream.write(`${message}\n`);
    this.fileSize("log");

  }

  error(message: string, trace?: string, context?: string) {
    if (this.logLevel > 4) return;

    const color = this.getColorCode("red");
    this.logger.error(`${color}${message}`, `${color}${trace}`, context);

    this.errorFileStream.write(`${message}\n ${trace}`);
    this.fileSize("err");
  }

  warn(message: string, context?: string) {
    if (this.logLevel > 3) return;

    this.logger.warn(message, context);
    this.logFileStream.write(`${message}\n`);
    this.fileSize("log");
  }

  debug(message: string, context?: string) {
    if (this.logLevel > 1) return;

    this.logger.debug(message, context);
    this.logFileStream.write(`${message}\n`);
    this.fileSize("log");
  }

  verbose(message: string, context?: string) {
    if (this.logLevel > 5) return;

    this.logger.verbose(message, context);
    this.logFileStream.write(`${message}\n`);
    this.fileSize("log");
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
    return join(appRoot, "..", "logs");
  }

  private get logPath() {
    return join(this.folderPath, "app.log");
  }

  private get errPath() {
    return join(this.folderPath, "err.log");
  }


  private fileSize(type: LogAndError) {
    const stats = type === "log" ? statSync(this.logFileStream.path) : statSync(this.errorFileStream.path);

    if (stats.size >= this.maxSize) {
      const stream = type === "log" ? this.logFileStream : this.errorFileStream;
      this.rotateFile(stream, type);
    }
  }

  async getAvailableToWriteFile(prefix: LogAndError) {
    const filePath = await new Promise<string | undefined>((res) => {
      readdir(this.folderPath, (err, files) => {
        if (err) res(undefined);
        if (files.length === 0) res(undefined);

        const logFiles = files.filter((file) => {
          const filePath = join(this.folderPath, file);
          const stats = statSync(filePath);
          const { size } = stats;
          console.log(this.maxSize);
          return file.startsWith(prefix) && file.endsWith(".log") && size < this.maxSize;
        });

        if (logFiles[0]) res(logFiles[0]);
        else res(undefined);
      });
    });
    console.log(filePath);
    return filePath;
  }

  private async rotateFile(stream: WriteStream, type: LogAndError) {
    if (stream) stream.close();

    let fileName: string;
    if (type === "log") {
      const oldFileName = await this.getAvailableToWriteFile("log");
      if (oldFileName) fileName = oldFileName;
      else fileName = `${type}-${+new Date()}.log`;
    } else {
      const oldFileName = await this.getAvailableToWriteFile("err");
      if (oldFileName) fileName = oldFileName;
      else fileName = `${type}-${+new Date()}.log`;
    }


    const newStream = createWriteStream(join(this.folderPath, fileName), { flags: "a" });
    if (type === "log") this.logFileStream = newStream;
    else this.errorFileStream = newStream;
  }


}