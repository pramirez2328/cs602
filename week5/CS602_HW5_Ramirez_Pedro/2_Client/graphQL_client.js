// File: ex02_graphQL_client.js

import * as clientModule from './clientCourseModule.js';

let result;

console.log('\nQuery random course');
result = await clientModule.getRandomCourse();
console.log(JSON.stringify(result, null, 2));

console.log('\nQuery course description');
result = await clientModule.getCourseDescription('602');
console.log(JSON.stringify(result, null, 2));

console.log('\nQuery courses by id - Basic Info');
result = await clientModule.lookupByCourseId_V1('CS 6.2');
console.log(JSON.stringify(result, null, 2));

console.log('\nQuery courses by id - with Coordinator and associated courses');
result = await clientModule.lookupByCourseId_V2('CS 6.2');
console.log(JSON.stringify(result, null, 2));

console.log('\nQuery courses by name ');
result = await clientModule.lookupByCourseName('^database');
console.log(JSON.stringify(result, null, 2));

console.log('\nQuery coordinator by id - with associated courses');
result = await clientModule.lookupByCoordinator('kalathur');
console.log(JSON.stringify(result, null, 2));

console.log('\n--------------------------------------------------------------------');

console.log('\nOne extra query of each type');

console.log('\nQuery random course');
result = await clientModule.getRandomCourse();
console.log(JSON.stringify(result, null, 2));

console.log('\nQuery course description');
result = await clientModule.getCourseDescription('777');
console.log(JSON.stringify(result, null, 2));

console.log('\nQuery courses by id - Basic Info');
result = await clientModule.lookupByCourseId_V1('CS 7.7');
console.log(JSON.stringify(result, null, 2));

console.log('\nQuery courses by id - with Coordinator and associated courses');
result = await clientModule.lookupByCourseId_V2('CS 7.7');
console.log(JSON.stringify(result, null, 2));

console.log('\nQuery courses by name ');
result = await clientModule.lookupByCourseName('^Web');
console.log(JSON.stringify(result, null, 2));

console.log('\nQuery coordinator by id - with associated courses');
result = await clientModule.lookupByCoordinator('day');
console.log(JSON.stringify(result, null, 2));

console.log('\n--------------------------------------------------------------------');

clientModule.client.clearStore();
