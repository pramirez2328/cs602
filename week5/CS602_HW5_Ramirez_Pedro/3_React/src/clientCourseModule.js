import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const baseServerURL = 'http://localhost:4000';

export const client = new ApolloClient({
  uri: `${baseServerURL}`,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only'
    }
  }
});

export const getRandomCourse = async () => {
  console.log('\nA Random Course:');

  const QUERY_GET_RANDOM_COURSE = `query ExampleQuery {
    randomCourse {
      _id
      courseName
      coordinator {
        _id
        firstName
        lastName
      }
    }
  }`;

  const result = await client.query({
    query: gql(QUERY_GET_RANDOM_COURSE)
  });

  return result.data;
};

export const getCourseDescription = async (id) => {
  console.log('\nGet Course Description:', id);

  if (id.startsWith('CS ')) id = id.substring(3);

  const QUERY_GET_COURSE_DESCRIPTION = `query ExampleQuery($courseDescriptionId: String!) {
    courseDescription(id: $courseDescriptionId) {
      course
      title
      credits
      content
    }
  }`;

  const result = await client.query({
    query: gql(QUERY_GET_COURSE_DESCRIPTION),
    variables: { courseDescriptionId: id }
  });

  return result.data;
};

export const lookupByCourseId_V1 = async (id) => {
  console.log('\nLookup by CourseId (V1):', id);

  const QUERY_GET_BY_COURSE_ID_V1 = `query Course($courseIdLookupId: String!) {
    courseIdLookup(id: $courseIdLookupId) {
      _id
      courseName
    }
  }`;

  const result = await client.query({
    query: gql(QUERY_GET_BY_COURSE_ID_V1),
    variables: { courseIdLookupId: id }
  });

  return result.data;
};

export const lookupByCourseId_V2 = async (id) => {
  console.log('\nLookup by CourseId (V2):', id);

  const QUERY_GET_BY_COURSE_ID_V2 = `query CourseId($courseIdLookupId: String!) {
    courseIdLookup(id: $courseIdLookupId) {
      _id
      courseName
      coordinator {
        _id
        firstName
        lastName
        courses {
          _id
          courseName
        }
      }
    }
  }`;

  const result = await client.query({
    query: gql(QUERY_GET_BY_COURSE_ID_V2),
    variables: { courseIdLookupId: id }
  });

  return result.data;
};

export const lookupByCourseName = async (name) => {
  console.log('\nLookup by CourseName:', name);

  const QUERY_GET_BY_COURSE_NAME = `query CourseName($courseNameLookupName: String!) {
    courseNameLookup(name: $courseNameLookupName) {
      _id
      courseName
      coordinator {
        _id
        firstName
        lastName
        courses {
          _id
          courseName
        }
      }
    }
  }`;

  const result = await client.query({
    query: gql(QUERY_GET_BY_COURSE_NAME),
    variables: { courseNameLookupName: name }
  });

  return result.data;
};

export const lookupByCoordinator = async (id) => {
  console.log('\nLookup by Coordinator:', id);

  const QUERY_GET_BY_COORDINATOR = `query Coordinator($coordinatorId: String!) {
    coordinator(id: $coordinatorId) {
      _id
      firstName
      lastName
      courses {
        _id
        courseName
        coordinator {
          _id
          firstName
          lastName
        }
      }
    }
  }`;

  const result = await client.query({
    query: gql(QUERY_GET_BY_COORDINATOR),
    variables: { coordinatorId: id }
  });

  return result.data;
};
