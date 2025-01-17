import fs from 'node:fs';

const jsonData = fs.readFileSync('cs_courses.json');
const courseData = JSON.parse(jsonData);
console.log('Read', courseData.courses.length, 'courses');

export const lookupByCourseId = (id) => {
  console.log('\n------------------------------------------------');
  console.log('* Lookup by CourseId', id);
  const regex = new RegExp(id);
  const result = courseData.courses.filter((course) => regex.test(course.course_id));

  return result;
};

export const lookupByCourseName = (name) => {
  console.log('\n------------------------------------------------');
  console.log('* Lookup by CourseName', name);
  const result = courseData.courses.filter((course) => course.course_name.includes(name));

  return result;
};

export const getRandomCourse = () => {
  console.log('\n------------------------------------------------');
  console.log('* A Random Course');
  const result = courseData.courses[Math.floor(Math.random() * courseData.courses.length)];

  return result;
};
