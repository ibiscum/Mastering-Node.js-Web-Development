import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export class SessionModel extends Model<
  InferAttributes<SessionModel>,
  InferCreationAttributes<SessionModel>
> {
  declare id: string;
  declare data: Record<string, unknown>;
  declare expires: Date;
}

export const initializeModel = (sequelize: Sequelize) => {
  SessionModel.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      data: { type: DataTypes.JSON },
      expires: { type: DataTypes.DATE },
    },
    { sequelize },
  );
};
