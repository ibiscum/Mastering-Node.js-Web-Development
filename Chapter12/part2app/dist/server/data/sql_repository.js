import { readFileSync } from "fs";
import { Database } from "sqlite3";
import { queryAllSql, queryByNameSql, insertPerson, insertCalculation, insertResult, } from "./sql_queries.js";
import { TransactionHelper } from "./sql_helpers.js";
export class SqlRepository {
    db;
    constructor() {
        this.db = new Database("age.db");
        this.db.exec(readFileSync("age.sql").toString(), (err) => {
            if (err != undefined)
                throw err;
        });
    }
    async saveResult(r) {
        return await new TransactionHelper()
            .add(insertPerson, { $name: r.name })
            .add(insertCalculation, {
            $age: r.age,
            $years: r.years,
            $nextage: r.nextage,
        })
            .add(insertResult, {
            $name: r.name,
            $age: r.age,
            $years: r.years,
            $nextage: r.nextage,
        })
            .run(this.db);
    }
    getAllResults($limit) {
        return this.executeQuery(queryAllSql, { $limit });
    }
    getResultsByName($name, $limit) {
        return this.executeQuery(queryByNameSql, { $name, $limit });
    }
    executeQuery(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err == undefined) {
                    resolve(rows);
                }
                else {
                    reject(err);
                }
            });
        });
    }
}
