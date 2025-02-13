// File: ListCourses.js

export default function Courses({ courseList, refreshById, refreshByName, describe, coordinatorLookup }) {
  function handleSubmitById(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formJson = Object.fromEntries(formData.entries());

    refreshById(formJson.id1);
  }

  function handleSubmitByName(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formJson = Object.fromEntries(formData.entries());

    refreshByName(formJson.id2);
  }

  function handleCourseClick(event, id) {
    event.preventDefault();
    console.log('Handle Course', id);
    describe(id);
  }

  function handleCoordinatorClick(event, id) {
    event.preventDefault();
    console.log('Handle Coordinator', id);
    coordinatorLookup(id);
  }

  return (
    <div>
      <div className='row'>
        <div className='col-sm-4'>
          <form onSubmit={handleSubmitById}>
            <div className='form-group row'>
              <label htmlFor='id1'>Course Id</label>
              <input type='text' placeholder='Enter id...' className='form-control' name='id1' id='id1' required />
            </div>
            <div className='form-group row'>
              <button type='submit' className='btn btn-primary'>
                Lookup By Id
              </button>
            </div>
          </form>
        </div>

        <div className='col-sm-2'></div>

        <div className='col-sm-4'>
          <form onSubmit={handleSubmitByName}>
            <div className='form-group row'>
              <label htmlFor='id2'>Course Name</label>
              <input type='text' placeholder='Enter name...' className='form-control' name='id2' id='id2' required />
            </div>
            <div className='form-group row'>
              <div>
                <button type='submit' className='btn btn-primary'>
                  Lookup By Name
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <h3>Course Lookup Results</h3>
      <div>
        {courseList.map((course) => (
          <div key={course.id} style={{ border: 'solid 1px rgb(223, 221, 221)', padding: '10px' }}>
            <b>
              <a href='dummy' onClick={(e) => handleCourseClick(e, course._id)}>
                {course._id}
              </a>{' '}
              - {course.courseName}
              <br />
              (Contact:
              <a href='dummy' onClick={(e) => handleCoordinatorClick(e, course.coordinator._id)}>
                {course.coordinator.firstName} {course.coordinator.lastName}
              </a>
              )
            </b>
          </div>
        ))}
      </div>
    </div>
  );
}
