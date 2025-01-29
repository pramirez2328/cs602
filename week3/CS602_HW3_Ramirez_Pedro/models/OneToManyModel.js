import { Course } from './Course.js';
import { Coordinator } from './Coordinator.js';

Coordinator.hasMany(Course, {
  foreignKey: 'coordinatorId',
  onDelete: 'CASCADE' // Ensures courses are deleted if a coordinator is removed
});
Course.belongsTo(Coordinator, {
  foreignKey: 'coordinatorId'
});

export { Course, Coordinator };
