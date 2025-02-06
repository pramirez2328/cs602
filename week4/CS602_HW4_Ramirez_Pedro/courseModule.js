import mongoose from 'mongoose';
import {dbURL}  from "./credentials.js";
import {Course, Coordinator} from 
    './models/index.js';

export const connection = await mongoose.connect(dbURL);

export const lookupByCourseId =  async (id) => {
	console.log("\nLookup by CourseId:", id);
	let result = [];

	// Fill in the code

	return JSON.parse(JSON.stringify(result));
};

export const lookupByCourseName = async (name) => {
  console.log("\nLookup by CourseName:", name);
  let result = [];

	// Fill in the code
  
	return JSON.parse(JSON.stringify(result));
};

export const lookupByCoordinator =  async (id) => {
	console.log("\nLookup by Coordinator:", id);
	let result = [];

	// Fill in the code
	
	return JSON.parse(JSON.stringify(result));
};

export const getRandomCourse = async () => {
	console.log("\nA Random Course:");
	let result = await Course.aggregate([
    { $sample: { size: 1 } }
   ]);
	await Course.populate(result, 
		{
			path: "coordinator",
			populate: {path: "courses", select: 'courseName'}
		});
	
	return JSON.parse(JSON.stringify(result[0]));
};

export const getCourseDescription = async (id) => {
	console.log("\nGet Course Description:", id);
	let response = await fetch("https://kalathur.com/php/getCourseData.php?id=cs" + id);
	let result = await response.json();
	return result;
}

