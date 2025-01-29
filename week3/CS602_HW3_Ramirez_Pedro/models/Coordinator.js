import { DataTypes } from 'sequelize';
import { db } from '../db.js';

const Coordinator = db.define('Coordinator', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
});

export { Coordinator };
