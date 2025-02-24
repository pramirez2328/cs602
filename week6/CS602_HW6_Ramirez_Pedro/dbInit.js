import fs from 'node:fs';
import { MongoClient, ServerApiVersion } from 'mongodb';
import bcrypt from 'bcryptjs';

import { dbURL } from './credentials.js';

const client = new MongoClient(dbURL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

async function initializeDatabase() {
  try {
    await client.connect();
    const db = client.db('cs602_hw4');

    // 🔹 Load and Insert Courses
    const json1Data = fs.readFileSync('cs602_hw4_courses.json');
    const courseData = JSON.parse(json1Data);
    console.log('Read', courseData.length, 'courses');

    const coursesCollection = db.collection('courses');
    await coursesCollection.deleteMany({});
    let result = await coursesCollection.insertMany(courseData);
    console.log('Inserted Courses Ids:', result.insertedIds);

    // 🔹 Load and Insert Coordinators
    const json2Data = fs.readFileSync('cs602_hw4_coordinators.json');
    const facultyData = JSON.parse(json2Data);
    console.log('Read', facultyData.length, 'faculty');

    const coordinatorsCollection = db.collection('coordinators');
    await coordinatorsCollection.deleteMany({});
    result = await coordinatorsCollection.insertMany(facultyData);
    console.log('Inserted Coordinators Ids:', result.insertedIds);

    // 🔹 Insert Users
    const usersCollection = db.collection('users');
    await usersCollection.deleteMany({}); // Reset users

    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    const users = [
      { username: 'admin', password: adminPassword, role: 'admin' },
      { username: 'user', password: userPassword, role: 'user' }
    ];

    result = await usersCollection.insertMany(users);
    console.log('✅ Inserted Users:', result.insertedIds);
  } catch (err) {
    console.error('❌ Error initializing database:', err);
  } finally {
    await client.close();
    console.log('🔌 Database connection closed.');
  }
}

// Run Initialization
initializeDatabase();
