import { DataTypes, Model } from 'sequelize';
import Account from './Account';
import db from './index';

class Transaction extends Model {
  public id!: number;
  public value!: number;
  public debitedAccountId!: number;
  public creditedAccountId!: number;
  public createdAt!: Date;
}

Transaction.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  debitedAccountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  creditedAccountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
}, {
  sequelize: db,
  timestamps: false,
});

Transaction.belongsTo(Account, { foreignKey: 'debitedAccountId', as: 'debitedAccount' });
Transaction.belongsTo(Account, { foreignKey: 'creditedAccountId', as: 'creditedAccount' });

export default Transaction;
