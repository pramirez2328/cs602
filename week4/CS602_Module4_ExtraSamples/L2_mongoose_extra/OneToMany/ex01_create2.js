// File: ex01_create2.js

import mongoose from 'mongoose';
import {dbURL} 	from "./credentials.js";
import {Course, Instructor} from 
	'./models/index.js';

const createCourse = async (data)  => {
	return Course.create(data);
};

const createInstructor = async (data) =>  {
	return Instructor.create(data);
};

// One-to-Many associations

const addInstructorToCourse = 
	async (course, instructor) => {
		course.courseInstructor = instructor;
		return course;
};

const addCourseToInstructor = 
	async (instructor, course) => {
	  // instructor.instructorCourses.push(course);
	  instructor.instructorCourses.addToSet(course);
	  return instructor;
};

// Create documents
const connection = await mongoose.connect(dbURL);

await Course.deleteMany({});
await Instructor.deleteMany({});

let c1 = await createCourse({
	courseNumber: 'cs1',
	courseName: 'Basics of AI'
});

let c2 = await createCourse({
	courseNumber: 'cs2',
	courseName: 'Intermediate AI'
});

let c3 = await createCourse({
	courseNumber: 'cs3',
	courseName: 'Advanced AI'
});

let i1 = await createInstructor(
	{ firstName: 'John',lastName: 'Doe'} );

let i2 = await createInstructor(
	{ firstName: 'Mary',lastName: 'Jones'} );

// Add instructors to courses

console.log(`\n>> Add i1 to c1`);
await addInstructorToCourse(c1, i1);

await c1.save();

console.log(`\n>> Add i1 to c2`);
await addInstructorToCourse(c2, i1);

console.log(`\n>> Add i2 to c2`);
await addInstructorToCourse(c2, i2);

await c2.save();

console.log(`\n>> Add i2 to c3`);
await addInstructorToCourse(c3, i2);

await c3.save();

// Add Courses to Instructors

console.log(`\n>> Add c1 to i1`);
await addCourseToInstructor(i1, c1);

console.log(`\n>> Add c2 to i1`);
await addCourseToInstructor(i1, c2);

await i1.save();

console.log(`\n>> Add c2 to i2`);
await addCourseToInstructor(i2, c2);

console.log(`\n>> Add c3 to i2`);
await addCourseToInstructor(i2, c3);

await i2.save();

await connection.disconnect();