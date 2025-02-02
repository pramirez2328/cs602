import express from 'express';

const router = express.Router();

// Use the course module
import * as courseDB from '../courseModule.js';

// router specs

router.use(function (req, res, next) {
  if (req.session.sessionData === undefined) {
    req.session.sessionData = {
      lookupByCourseId: [],
      lookupByCourseName: [],
      lookupByCoordinator: [],
      courseDescription: []
    };
  }
  next();
});

// GET request to the homepage

router.get('/', function (req, res) {
  res.render('homeView');
});

router.get('/cid', async function (req, res) {
  if (req.query.id) {
    let id = req.query.id;
    let result = await courseDB.lookupByCourseId(id);

    if (!req.session.sessionData['lookupByCourseId'].includes(encodeURIComponent(id)))
      req.session.sessionData['lookupByCourseId'].push(encodeURIComponent(id));

    res.render('lookupByCourseIdView', { query: id, courses: result });
  } else {
    res.render('lookupByCourseIdForm');
  }
});

router.post('/cid', async function (req, res) {
  let id = req.body.id;
  let result = await courseDB.lookupByCourseId(id);
  if (!req.session.sessionData['lookupByCourseId'].includes(encodeURIComponent(id)))
    req.session.sessionData['lookupByCourseId'].push(encodeURIComponent(id));

  res.render('lookupByCourseIdView', { query: id, courses: result });
});

router.get('/cid/:id', async function (req, res) {
  let id = req.params.id;
  let result = await courseDB.lookupByCourseId(id);

  if (!req.session.sessionData.lookupByCourseId.includes(encodeURIComponent(id))) {
    req.session.sessionData.lookupByCourseId.push(encodeURIComponent(id));
  }

  res.format({
    'application/json': () => {
      res.json({ query: id, courses: result });
    },
    'text/html': () => {
      res.render('lookupByCourseIdView', { query: id, courses: result });
    },
    default: () => {
      res.status(406).send('Not Acceptable');
    }
  });
});

router.get('/cname', async function (req, res) {
  if (req.query.name) {
    let name = req.query.name;
    let result = await courseDB.lookupByCourseName(name);

    if (!req.session.sessionData.lookupByCourseName.includes(encodeURIComponent(name))) {
      req.session.sessionData.lookupByCourseName.push(encodeURIComponent(name));
    }
    res.render('lookupByCourseNameView', { query: name, courses: result });
  } else {
    res.render('lookupByCourseNameForm');
  }
});

router.post('/cname', async function (req, res) {
  let name = req.body.name;
  let result = await courseDB.lookupByCourseName(name);

  if (!req.session.sessionData.lookupByCourseName.includes(encodeURIComponent(name))) {
    req.session.sessionData.lookupByCourseName.push(encodeURIComponent(name));
  }

  res.render('lookupByCourseNameView', { query: name, courses: result });
});

router.get('/cname/:name', async function (req, res) {
  let name = req.params.name;
  let result = await courseDB.lookupByCourseName(name);

  if (!req.session.sessionData.lookupByCourseName.includes(encodeURIComponent(name))) {
    req.session.sessionData.lookupByCourseName.push(encodeURIComponent(name));
  }

  res.format({
    'application/json': () => {
      res.json({ query: name, courses: result });
    },
    'text/html': () => {
      res.render('lookupByCourseNameView', { query: name, courses: result });
    },
    default: () => {
      res.status(406).send('Not Acceptable');
    }
  });
});

router.get('/random', async function (req, res) {
  let result = await courseDB.getRandomCourse();

  if (!req.session.sessionData.lookupByCourseId.includes(encodeURIComponent(result.courseId))) {
    req.session.sessionData.lookupByCourseId.push(encodeURIComponent(result.courseId));
  }

  res.render('randomView', result);
});

router.get('/describe/:id', async function (req, res) {
  let id = req.params.id;
  let description = await courseDB.getCourseDescription(id);

  if (!req.session.sessionData.courseDescription.includes(encodeURIComponent(id))) {
    req.session.sessionData.courseDescription.push(encodeURIComponent(id));
  }

  res.render('courseDescriptionView', { query: id, description });
});

router.get('/coordinator/:id', async function (req, res) {
  let id = req.params.id;
  let result = await courseDB.lookupByCoordinator(id);

  if (!req.session.sessionData.lookupByCoordinator.includes(encodeURIComponent(id))) {
    req.session.sessionData.lookupByCoordinator.push(encodeURIComponent(id));
  }

  res.render('coordinatorView', { query: id, courses: result.Courses });
});

router.get('/history', function (req, res) {
  const result = {
    lookupByCourseId: req.session.sessionData.lookupByCourseId,
    lookupByCourseName: req.session.sessionData.lookupByCourseName,
    lookupByCoordinator: req.session.sessionData.lookupByCoordinator,
    courseDescription: req.session.sessionData.courseDescription
  };
  res.render('sessionView', result);
});

export { router };
