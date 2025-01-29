import { DataTypes } from 'sequelize';
import { db } from '../db.js';

const Course = db.define('Course', {
  courseId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  courseName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.courseId.slice(-3);
    }
  },
  coordinatorId: {
    // Foreign key referencing Coordinator
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Coordinators', // Table name for Coordinator
      key: 'id'
    }
  }
});

export { Course };
