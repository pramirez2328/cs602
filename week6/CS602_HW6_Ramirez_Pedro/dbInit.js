import fs from 'node:fs';

import { MongoClient, ServerApiVersion } from 'mongodb';

import { dbURL } from './credentials.js';

const client = new MongoClient(dbURL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

let result;

const json1Data = fs.readFileSync('cs602_hw4_courses.json');
const courseData = JSON.parse(json1Data);
console.log('Read', courseData.length, 'courses');

const coursesCollection = client.db('cs602_hw4').collection('courses');
await coursesCollection.deleteMany({});
result = await coursesCollection.insertMany(courseData);
console.log('Inserted Ids:', result.insertedIds);

const json2Data = fs.readFileSync('cs602_hw4_coordinators.json');
const facultyData = JSON.parse(json2Data);
console.log('Read', facultyData.length, 'faculty');

const coordinatorsCollection = client.db('cs602_hw4').collection('coordinators');
await coordinatorsCollection.deleteMany({});
result = await coordinatorsCollection.insertMany(facultyData);
console.log('Inserted Ids:', result.insertedIds);

await client.close();
