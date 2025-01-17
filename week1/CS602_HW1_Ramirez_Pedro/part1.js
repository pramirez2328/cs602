import * as courseDB from './courseModule.js';

console.log(courseDB.lookupByCourseId('CS 111'));
console.log(courseDB.lookupByCourseId('CS 602'));
console.log(courseDB.lookupByCourseId('^CS 2'));
console.log(courseDB.lookupByCourseId('6.2$'));
console.log(courseDB.lookupByCourseId('CS 777'));
console.log(courseDB.lookupByCourseId('00$'));

console.log(courseDB.lookupByCourseName('Web'));
console.log(courseDB.lookupByCourseName('Cryptography'));
console.log(courseDB.lookupByCourseName('Computer'));

console.log(courseDB.getRandomCourse());
console.log(courseDB.getRandomCourse());
console.log(courseDB.getRandomCourse());
console.log(courseDB.getRandomCourse());
