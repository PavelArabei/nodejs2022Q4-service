import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "@app/auth/decorators/public.decorator";

@Public()
@ApiTags("isWorking")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
