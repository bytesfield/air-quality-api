import { Model, DataTypes, Optional } from 'sequelize';
import { PollutionAttributes } from '../interfaces/model.interface';
import { sequelize } from '../database/sequelize';

type CreationAttributes = Optional<PollutionAttributes, 'id'>;

class Pollution extends Model<PollutionAttributes, CreationAttributes> implements PollutionAttributes {
  id: number;
  location_id?: number;
  ts: string;
  aqius: number;
  mainus: string;
  aqicn: number;
  maincn: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  static associate(models: any) {
    Pollution.belongsTo(models.locations, {
      foreignKey: 'location_id',
      constraints: true,
      as: 'locations'
    });
  }
}

Pollution.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER().UNSIGNED
    },
    location_id: {
      allowNull: false,
      type: DataTypes.INTEGER().UNSIGNED
    },
    ts: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    aqius: {
      allowNull: false,
      type: DataTypes.INTEGER()
    },
    mainus: {
      allowNull: false,
      type: DataTypes.STRING(10)
    },
    aqicn: {
      allowNull: false,
      type: DataTypes.INTEGER()
    },
    maincn: {
      allowNull: false,
      type: DataTypes.STRING(10)
    }
  },
  {
    tableName: 'pollutions',
    sequelize
  }
);

export { Pollution };
