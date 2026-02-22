import {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { Customer } from "../../customer_models.js";

export class CustomerModel
  extends Model<
    InferAttributes<CustomerModel>,
    InferCreationAttributes<CustomerModel>
  >
  implements Customer
{
  declare id?: CreationOptional<number>;
  declare name: string;
  declare email: string;
}
