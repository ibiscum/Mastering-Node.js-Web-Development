import { CatalogRepository } from "../catalog_repository.js";
import { BaseRepo } from "./core.js";
import { AddQueries } from "./queries.js";
import { AddStorage } from "./storage.js";

const RepoWithQueries = AddQueries(BaseRepo);
const CompleteRepo = AddStorage(RepoWithQueries);

export const CatalogRepoImpl = CompleteRepo;
