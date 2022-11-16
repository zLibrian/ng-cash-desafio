import { DataTypes, Model } from 'sequelize';
import db from './index';

class Account extends Model {
  public id!: number;
  public balance!: number;
}

Account.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: false,
});

export default Account;
