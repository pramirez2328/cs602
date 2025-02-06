// File: ex02_navigate.js

import mongoose from 'mongoose';
import {dbURL}  from "./credentials.js";
import {Course, Instructor} from 
    './models/index.js';

import colors from 'colors';

const connection = await mongoose.connect(dbURL);

let course, instructor;

console.log("\n>> Course Find cs2".red);
course = await Course.findOne({courseNumber: 'cs2'});
console.log(course);

console.log("\n>> Course Find cs2 with populate".red); 
course = await Course.findOne({courseNumber: 'cs2'})
                     .populate("courseInstructor");
console.log(JSON.stringify(course, null, 2));

console.log(`\n>> Course Find cs2 with populate - 
    include only some fields`.red);
course = await Course.findOne({courseNumber: 'cs2'})
                     .populate("courseInstructor", 
                        "_id firstName lastName");
console.log(JSON.stringify(course, null, 2));


console.log("\n>> Course Find cs2 with populate multiple levels".red);
course = await Course.findOne({courseNumber: 'cs2'})
                     .populate({
                        path: "courseInstructor",
                        select: "firstName lastName -_id",
                        populate: 
                          { path: "instructorCourse", 
                            select: "courseNumber courseName -_id"
                          }
                    });
console.log(JSON.stringify(course, null, 2));


console.log("\n>> Instructor Find John Doe with populate multiple levels".red);
instructor = await Instructor.findOne({firstName: 'John', lastName: 'Doe'})
                     .populate({
                        path: "instructorCourse",
                        select: "courseNumber courseName -_id",
                        populate: 
                          { path: "courseInstructor", 
                            select: "firstName lastName -_id"
                          }
                    });
console.log(JSON.stringify(instructor, null, 2));


await mongoose.disconnect();
