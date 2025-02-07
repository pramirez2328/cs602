import mongoose from 'mongoose';
import { dbURL } from './credentials.js';
import { Course, Coordinator } from './models/index.js';

export const connection = await mongoose.connect(dbURL);

export const lookupByCourseId = async (id) => {
  console.log('\nLookup by CourseId:', id);
  let result = [];

  result = await Course.find({ _id: new RegExp(id) }).populate('coordinator');

  return JSON.parse(JSON.stringify(result));
};

export const lookupByCourseName = async (name) => {
  console.log('\nLookup by CourseName:', name);
  let result = [];

  result = await Course.find({ courseName: new RegExp(name) }).populate('coordinator');

  return JSON.parse(JSON.stringify(result));
};

export const lookupByCoordinator = async (id) => {
  console.log('\nLookup by Coordinator:', id);
  let result = [];

  result = await Coordinator.findById(id).populate('courses');
  console.log(JSON.stringify(result, null, 2));

  return JSON.parse(JSON.stringify(result));
};

export const getRandomCourse = async () => {
  console.log('\nA Random Course:');
  let result = await Course.aggregate([{ $sample: { size: 1 } }]);
  await Course.populate(result, {
    path: 'coordinator',
    populate: { path: 'courses', select: 'courseName' }
  });

  console.log(JSON.stringify(result[0], null, 2));
  return JSON.parse(JSON.stringify(result[0]));
};

export const getCourseDescription = async (id) => {
  console.log('\nGet Course Description:', id);
  let response = await fetch('https://kalathur.com/php/getCourseData.php?id=cs' + id);
  let result = await response.json();

  console.log(JSON.stringify(result, null, 2));
  return result;
};
