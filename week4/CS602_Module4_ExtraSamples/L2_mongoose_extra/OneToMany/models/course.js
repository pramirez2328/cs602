// File: course.js

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseNumber: String,
  courseName: String,
  courseInstructor: 
    {
      type: Schema.Types.ObjectId,
      ref: "Instructor"
    }
    
}, {collection : 'courses_sk'});

export const Course = mongoose.model(
  "Course", courseSchema);