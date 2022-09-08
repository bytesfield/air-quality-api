import { Model, DataTypes, Optional } from 'sequelize';
import { LocationAttributes } from '../interfaces/model.interface';
import { sequelize } from '../database/sequelize';

type CreationAttributes = Optional<LocationAttributes, 'id'>;

class Location extends Model<LocationAttributes, CreationAttributes>
  implements LocationAttributes
{
  id: number;
  city: string;
  state: string;
  country: string;
  type: string;
  coordinates: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  static associate(models: any){
      Location.hasMany(models.pollutions, {
        foreignKey: 'location_id',
        constraints: false,
        as: 'pollutions'
      });
      Location.hasMany(models.weathers, {
        foreignKey: 'location_id',
        constraints: false,
        as: 'weathers'
      });
  };
}

Location.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER().UNSIGNED
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    coordinates: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    }
  },
  {
    tableName: 'locations',
    sequelize
  }
);

export { Location };


