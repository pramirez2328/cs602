
import * as courseDB from './courseModule.js';

let result;


result = await courseDB.lookupByCourseId("^CS 20");
console.log(JSON.stringify(result, null, 2));

result = await courseDB.lookupByCourseId("5.4$");
console.log(JSON.stringify(result, null, 2));

result = await courseDB.lookupByCourseName("^Soft");
console.log(JSON.stringify(result, null, 2));

result = await courseDB.lookupByCoordinator('kalathur');
console.log(JSON.stringify(result, null, 2));

result = await courseDB.getRandomCourse();
console.log(JSON.stringify(result, null, 2));

result = await courseDB.getCourseDescription('632');
console.log(result);

// Include other test cases


await courseDB.connection.disconnect();
