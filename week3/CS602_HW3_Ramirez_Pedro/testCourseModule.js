import * as courseDB from './courseModule.js';

let result;

result = await courseDB.lookupByCourseId('CS %77');
console.log(result);
console.log('\n-----------------------------------');

result = await courseDB.lookupByCourseName('%Python%');
console.log(result);
console.log('\n-----------------------------------');

result = await courseDB.lookupByCoordinator('kalathur');
console.log(result);
console.log('\n-----------------------------------');

result = await courseDB.getRandomCourse();
console.log(result);
console.log('\n-----------------------------------');

result = await courseDB.getCourseDescription('632');
console.log(result);
console.log('\n-----------------------------------');

console.log('---- two extra tests for each function ----');

result = await courseDB.lookupByCourseId('%01');
console.log(result);
result = await courseDB.lookupByCourseId('CS 555');
console.log(result);
console.log('\n-----------------------------------');

result = await courseDB.lookupByCourseName('Database%');
console.log(result);
result = await courseDB.lookupByCourseName('Cyber%');
console.log(result);
console.log('\n-----------------------------------');

result = await courseDB.lookupByCoordinator('day');
console.log(result);
result = await courseDB.lookupByCoordinator('temkin');
console.log(result);
console.log('\n-----------------------------------');

result = await courseDB.getRandomCourse();
console.log(result);
result = await courseDB.getRandomCourse();
console.log(result);
console.log('\n-----------------------------------');

result = await courseDB.getCourseDescription('341');
console.log(result);
result = await courseDB.getCourseDescription('521');
console.log(result);
