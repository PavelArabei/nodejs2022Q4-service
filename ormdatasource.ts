import { DataSource } from "typeorm";
import ormConfig from "./src/orm.config";

export default new DataSource(ormConfig);
