import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { userDBService } from './user.db.service';

@Global()
@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {
  static forRoot(): any {
    return {
      module: DbModule,
      providers: [DbService, userDBService],
      exports: [DbService],
    };
  }
}
