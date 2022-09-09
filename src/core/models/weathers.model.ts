import { Model, DataTypes, Optional } from 'sequelize';
import { WeatherAttributes } from '../interfaces/model.interface';
import { sequelize } from '../database/sequelize';

type CreationAttributes = Optional<WeatherAttributes, 'id'>;

class Weather extends Model<WeatherAttributes, CreationAttributes> implements WeatherAttributes {
  id: number;
  location_id?: number;
  ts: string;
  tp: number;
  pr: number;
  hu: number;
  ws: number;
  wd: number;
  ic: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  static associate(models: any) {
    Weather.belongsTo(models.locations, {
      foreignKey: 'location_id',
      constraints: true,
      as: 'locations'
    });
  }
}

Weather.init(
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
    tp: {
      allowNull: false,
      type: DataTypes.INTEGER()
    },
    pr: {
      allowNull: false,
      type: DataTypes.INTEGER()
    },
    hu: {
      allowNull: false,
      type: DataTypes.INTEGER()
    },
    ws: {
      allowNull: false,
      type: DataTypes.INTEGER()
    },
    wd: {
      allowNull: false,
      type: DataTypes.INTEGER()
    },
    ic: {
      allowNull: false,
      type: DataTypes.STRING(10)
    }
  },
  {
    tableName: 'weathers',
    sequelize
  }
);

export { Weather };
