import { Repository } from "./repository.js";
//import { SqlRepository } from "./sql_repository";
import { OrmRepository } from "./orm_repository.js";

const repository: Repository = new OrmRepository();
export default repository;
