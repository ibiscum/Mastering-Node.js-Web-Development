import { BaseRepo } from "./core.js";
import { AddQueries } from "./queries.js";
import { AddStorage } from "./storage.js";
import { AddOrderQueries } from "./order_queries.js";
import { AddOrderStorage } from "./order_storage.js";

const CatalogRepo = AddStorage(AddQueries(BaseRepo));
const RepoWithOrders = AddOrderStorage(AddOrderQueries(CatalogRepo));

export const CatalogRepoImpl = RepoWithOrders;
