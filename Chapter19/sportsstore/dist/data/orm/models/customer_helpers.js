import { DataTypes } from "sequelize";
import { CustomerModel } from "./customer_models.js";
export const initializeCustomerModels = (sequelize) => {
    CustomerModel.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        federatedId: { type: DataTypes.STRING },
    }, { sequelize });
};
