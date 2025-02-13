// File: Coordinator.js

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const coordinatorSchema = new Schema({
  _id: String,
  firstName: String,
  lastName: String,
  courses: [
    {
      type: String,
      ref: "Course"
    }
  ]
}, {collection : 'coordinators'});

export const Coordinator = mongoose.model(
  "Coordinator", coordinatorSchema);
