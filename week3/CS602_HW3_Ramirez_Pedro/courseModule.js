import Sequelize from 'sequelize';

import { Op } from 'sequelize';

import { db }  from './db.js';

import { Course, Coordinator } from
   './models/OneToManyModel.js';

export const lookupByCourseId =  async (id) => {
	console.log("\nLookup by CourseId:", id);
	let result;

	// Fill in the code

	return JSON.parse(JSON.stringify(result));
};

export const lookupByCourseName = async (name) => {
  console.log("\nLookup by CourseName:", name);
	let result ;

	// Fill in the code

	return JSON.parse(JSON.stringify(result));
};

export const lookupByCoordinator =  async (id) => {
	console.log("\nLookup by Coordinator:", id);
	let result ;

	// Fill in the code

	return JSON.parse(JSON.stringify(result));
};

export const getRandomCourse = async () => {
	console.log("\nA Random Course:");
	let result = await Course.findOne(
		{ order:  Sequelize.fn('RANDOM'),
		include: Coordinator });

	return JSON.parse(JSON.stringify(result));
};

export const getCourseDescription = async (id) => {
	console.log("\nGet Course Description:", id);
	let response = await fetch("https://kalathur.com/php/getCourseData.php?id=cs" + id);
	let result = await response.json();
	return result;
}

