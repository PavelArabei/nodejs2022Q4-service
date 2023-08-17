import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class MyLoggingService {
  private logger: Logger;


  constructor() {
    this.logger = new Logger();
  }

  log(message: string) {
    const color = this.getColorCode("blue");

    this.logger.log(`${color}${message}`);
    //this.logger.log(message, context);
  }

  error(message: string, trace?: string, context?: string) {
    const color = this.getColorCode("red");
    this.logger.error(`${color}${message}`, `${color}${trace}`, context);
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, context);
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, context);
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, context);
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

}