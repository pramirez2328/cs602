import fs from 'node:fs';

const jsonData = fs.readFileSync('cs_courses.json');
const courseData = JSON.parse(jsonData);
console.log("Read", courseData.courses.length, "courses");

export const lookupByCourseId =  (id) => {
	console.log("\nLookup by CourseId", id);
	let result;
	let re = new RegExp(id);

	// Fill in the code

	return result;
};

export const lookupByCourseName= (name) => {
  console.log("\nLookup by CourseName", name);
  let result;
	
	// Fill in the code
	
	return result;
};

export const getRandomCourse = () => {
	console.log("\nA Random Course");
	let result;
	
	// Fill in the code
	
	return result;
};

