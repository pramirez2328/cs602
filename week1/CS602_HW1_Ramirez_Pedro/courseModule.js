import fs from 'node:fs';

const jsonData = fs.readFileSync('cs_courses.json');
const courseData = JSON.parse(jsonData);
console.log('Read', courseData.courses.length, 'courses');

export const lookupByCourseId = (id) => {
  console.log('\nLookup by CourseId', id);
  const regex = new RegExp(id);
  let result = courseData.courses.filter((course) => regex.test(course.course_id));

  return result;
};

export const lookupByCourseName = (name) => {
  console.log('\nLookup by CourseName', name);
  let result = courseData.courses.filter((course) => course.course_name.includes(name));

  return result;
};

export const getRandomCourse = () => {
  console.log('\nA Random Course');
  let result = courseData.courses[Math.floor(Math.random() * courseData.courses.length)];

  return result;
};
