import fs from 'node:fs';

const jsonData = fs.readFileSync('cs_courses.json');
const courseData = JSON.parse(jsonData);
console.log('Read', courseData.courses.length, 'courses');

export const lookupByCourseId = (id) => {
  if (!id) return [];
  console.log('\nLookup by CourseId', id);
  const regex = new RegExp(id);
  const result = courseData.courses.filter((course) => regex.test(course.course_id));

  return result;
};

export const lookupByCourseName = (name) => {
  console.log('\nLookup by CourseName', name);
  let result;

  // Fill in the code

  return result;
};

export const getRandomCourse = () => {
  console.log('\nA Random Course:');
  const result = courseData.courses[Math.floor(Math.random() * courseData.courses.length)];

  return result;
};
