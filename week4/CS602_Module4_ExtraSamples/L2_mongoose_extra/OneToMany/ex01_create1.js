// File: ex01_create1.js

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

// Many-to-Many associations

const addInstructorToCourse = 
	async (courseId, instructorId) => {
	
		return Course.findByIdAndUpdate(
			courseId, 
			{ $set: { courseInstructor: instructorId} }, 
			{new: true}
		);
};

const addCourseToInstructor = 
	async (instructorId, courseId) => {

		return Instructor.findByIdAndUpdate(
			instructorId, 
			{ $addToSet: { instructorCourses: courseId} },
			{new: true}
		);
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

console.log("\n>> Created Instructor:\n", i1);

let i2 = await createInstructor(
	{ firstName: 'Mary',lastName: 'Jones'} );

console.log("\n>> Created Instructor:\n", i2);

// Add instructors to courses

console.log(`\n>> Add i1 to c1`);
await addInstructorToCourse(c1._id, i1._id);

console.log(`\n>> Add i1 to c2`);
await addInstructorToCourse(c2._id, i1._id);

console.log(`\n>> Add i2 to c2`);
await addInstructorToCourse(c2._id, i2.id);

console.log(`\n>> Add i2 to c3`);
await addInstructorToCourse(c3._id, i2._id);

// Add Courses to Instructors

console.log(`\n>> Add c1 to i1`);
await addCourseToInstructor(i1._id, c1._id);

console.log(`\n>> Add c2 to i1`);
await addCourseToInstructor(i1._id, c2._id);

console.log(`\n>> Add c2 to i2`);
await addCourseToInstructor(i2._id, c2._id);

console.log(`\n>> Add c3 to i2`);
await addCourseToInstructor(i2._id, c3._id);
	
await connection.disconnect();		
