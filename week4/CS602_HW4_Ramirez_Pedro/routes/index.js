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
      courseDescrition: []
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

  if (!req.session.sessionData['lookupByCourseId'].includes(encodeURIComponent(id)))
    req.session.sessionData['lookupByCourseId'].push(encodeURIComponent(id));

  res.format({
    'application/json': function () {
      res.json({ query: id, courses: result });
    },
    'text/html': function () {
      res.render('lookupByCourseIdView', { query: id, courses: result });
    }
  });
});

router.get('/cname', async function (req, res) {
  if (req.query.name) {
    let name = req.query.name;
    let result = await courseDB.lookupByCourseName(name);

    if (!req.session.sessionData['lookupByCourseName'].includes(encodeURIComponent(name)))
      req.session.sessionData['lookupByCourseName'].push(encodeURIComponent(name));
    res.render('lookupByCourseNameView', { query: name, courses: result });
  } else {
    res.render('lookupByCourseNameForm');
  }
});

router.post('/cname', async function (req, res) {
  // Fill in the code
});

router.get('/cname/:name', async function (req, res) {
  // Fill in the code
});

router.get('/coordinator/:id', async function (req, res) {
  // Fill in the code
  let id = req.params.id;
  let result = await courseDB.lookupByCoordinator(id);

  if (!req.session.sessionData['lookupByCoordinator'].includes(id))
    req.session.sessionData['lookupByCoordinator'].push(id);

  res.render('coordinatorView', { query: id, coordinator: result });
});

router.get('/random', async function (req, res) {
  const result = await courseDB.getRandomCourse();

  res.format({
    'application/json': function () {
      res.json(result);
    },
    'text/html': function () {
      res.render('randomView', result);
    }
  });
});

router.get('/describe/:id', async function (req, res) {
  let id = req.params.id;
  if (id.startsWith('CS ')) id = id.substring(3);

  let result = await courseDB.getCourseDescription(id);

  if (!req.session.sessionData['courseDescrition'].includes(id)) req.session.sessionData['courseDescrition'].push(id);

  res.format({
    'application/json': function () {
      res.json({ query: id, description: result });
    },
    'text/html': function () {
      res.render('courseDescriptionView', { query: id, description: result });
    }
  });
});

router.get('/history', function (req, res) {
  let sessionData = req.session.sessionData;

  let courseIdData = sessionData['lookupByCourseId'].map((e) => ({ name: e, displayName: decodeURIComponent(e) }));

  let courseNameData = sessionData['lookupByCourseName'].map((e) => ({ name: e, displayName: decodeURIComponent(e) }));

  res.render('sessionView', {
    lookupByCourseId: courseIdData,
    lookupByCourseName: courseNameData,
    lookupByCoordinator: sessionData['lookupByCoordinator'],
    courseDescrition: sessionData['courseDescrition']
  });
});

export { router };
