// File: ShowCoordinatorInfo.js

export default function CoordinatorInfo({ coordinatorInfo, describe }) {
  function handleCourseClick(event, id) {
    event.preventDefault();
    console.log('Handle Course', id);
    describe(id);
  }

  if (coordinatorInfo)
    return (
      <div>
        <h5>
          <b>
            Coordinator: {coordinatorInfo.firstName} {coordinatorInfo.lastName}
          </b>
        </h5>
        <h5>Contact Email: {coordinatorInfo.lastName}@bu.edu</h5>
        <h5>Coordinator for the following courses:</h5>
        <ol>
          {coordinatorInfo.courses.map((course) => (
            <li key={course._id}>
              <a href='dummy' onClick={(e) => handleCourseClick(e, course._id)}>
                {course._id}
              </a>{' '}
              - <b>{course.courseName}</b>
            </li>
          ))}
        </ol>
      </div>
    );
}
