import { Sequelize } from "sequelize";
import { addSeedData, defineRelationships, fromOrmModel, initializeModels, } from "./orm_helpers.js";
import { Calculation, Person, ResultModel } from "./orm_models.js";
export class OrmRepository {
    sequelize;
    constructor() {
        this.sequelize = new Sequelize({
            dialect: "sqlite",
            storage: "orm_age.db",
            logging: console.log,
            logQueryParameters: true,
        });
        this.initModelAndDatabase();
    }
    async initModelAndDatabase() {
        initializeModels(this.sequelize);
        defineRelationships();
        await this.sequelize.drop();
        await this.sequelize.sync();
        await addSeedData(this.sequelize);
    }
    async saveResult(r) {
        return await this.sequelize.transaction(async (tx) => {
            const [person] = await Person.findOrCreate({
                where: { name: r.name },
                transaction: tx,
            });
            const [calculation] = await Calculation.findOrCreate({
                where: {
                    age: r.age,
                    years: r.years,
                    nextage: r.nextage,
                },
                transaction: tx,
            });
            return (await ResultModel.create({
                personId: person.id,
                calculationId: calculation.id,
            }, { transaction: tx })).id;
        });
    }
    async getAllResults(limit) {
        return (await ResultModel.findAll({
            include: [Person, Calculation],
            limit,
            order: [["id", "DESC"]],
        })).map((row) => fromOrmModel(row));
    }
    async getResultsByName(name, limit) {
        return (await ResultModel.findAll({
            include: [Person, Calculation],
            where: {
                "$Person.name$": name,
            },
            limit,
            order: [["id", "DESC"]],
        })).map((row) => fromOrmModel(row));
    }
}
