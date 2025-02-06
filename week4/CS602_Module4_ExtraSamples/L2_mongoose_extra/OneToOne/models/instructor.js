// File: instructor.js

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
  firstName: String,
  lastName: String,
  instructorCourse: 
    {
      type: Schema.Types.ObjectId,
      ref: "Course"
    }
}, {collection : 'instructors_sk'});

export const Instructor = mongoose.model(
  "Instructor", instructorSchema);
