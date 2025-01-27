import * as courseDB from './courseModule.js';

let result;

result = await courseDB.lookupByCourseId("CS %77");
console.log(result);

result = await courseDB.lookupByCourseName("%Python%");
console.log(result);

result = await courseDB.lookupByCoordinator('kalathur');
console.log(result);

result = await courseDB.getRandomCourse();
console.log(result);

result = await courseDB.getCourseDescription('632');
console.log(result);

// Write One additional test case for each of the above.
// Make sure lookupByCourseId and lookupByCourseName provide more than one match.
