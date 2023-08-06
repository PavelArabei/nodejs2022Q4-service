import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as process from "process";

const HOST = process.env.POSTGRES_HOST || "localhost";
const config: PostgresConnectionOptions = {
  type: "postgres",
  host: HOST,
  port: 5432,
  username: "postgres",
  password: "7788",
  database: "homelibrary",
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  synchronize: false,
  migrations: [__dirname + "/migrations/**/*{.ts,.js}"]
};
export default config;