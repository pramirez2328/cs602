import express from 'express';
import passport from 'passport';
import * as courseDB from '../courseModule.js';

const router = express.Router();

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Middleware to check if user is an admin
function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  res.status(403).send('Access denied. Admins only.');
}

// Session data initialization middleware
router.use((req, res, next) => {
  if (!req.session.sessionData) {
    req.session.sessionData = {
      lookupByCourseId: [],
      lookupByCourseName: [],
      lookupByCoordinator: [],
      courseDescription: []
    };
  }
  next();
});

// Home Route
router.get('/', (req, res) => {
  res.render('homeView', { user: req.user });
});

// Login Route
router.get('/login', (req, res) => {
  res.render('loginView');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      console.log('❌ Login failed:', info.message);
      return res.redirect('/login');
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      console.log('✅ Login successful:', req.user);
      console.log('🔍 Session after login:', req.session);

      req.session.save((err) => {
        // ✅ Forces session to be stored before redirecting
        if (err) return next(err);
        console.log('✅ Session saved!');
        res.redirect('/');
      });
    });
  })(req, res, next); // ✅ Pass `req, res, next` explicitly
});

// Logout Route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Protected Routes (Authenticated Users Only)
router.use(isAuthenticated);

// Course Lookup by ID (Admins Only)
router.get('/cid', isAdmin, async (req, res) => {
  if (req.query.id) {
    let id = req.query.id;
    let result = await courseDB.lookupByCourseId(id);

    if (!req.session.sessionData.lookupByCourseId.includes(encodeURIComponent(id)))
      req.session.sessionData.lookupByCourseId.push(encodeURIComponent(id));

    res.render('lookupByCourseIdView', { query: id, courses: result });
  } else {
    res.render('lookupByCourseIdForm');
  }
});

router.post('/cid', isAdmin, async (req, res) => {
  let id = req.body.id;
  let result = await courseDB.lookupByCourseId(id);

  if (!req.session.sessionData.lookupByCourseId.includes(encodeURIComponent(id)))
    req.session.sessionData.lookupByCourseId.push(encodeURIComponent(id));

  res.render('lookupByCourseIdView', { query: id, courses: result });
});

router.get('/cid/:id', isAdmin, async (req, res) => {
  let id = req.params.id;
  let result = await courseDB.lookupByCourseId(id);

  if (!req.session.sessionData.lookupByCourseId.includes(encodeURIComponent(id)))
    req.session.sessionData.lookupByCourseId.push(encodeURIComponent(id));

  res.format({
    'application/json': () => res.json({ query: id, courses: result }),
    'text/html': () => res.render('lookupByCourseIdView', { query: id, courses: result })
  });
});

// Course Lookup by Name (Admins Only)
router.get('/cname', isAdmin, async (req, res) => {
  if (req.query.name) {
    let name = req.query.name;
    let result = await courseDB.lookupByCourseName(name);

    if (!req.session.sessionData.lookupByCourseName.includes(encodeURIComponent(name)))
      req.session.sessionData.lookupByCourseName.push(encodeURIComponent(name));

    res.render('lookupByCourseNameView', { query: name, courses: result });
  } else {
    res.render('lookupByCourseNameForm');
  }
});

router.post('/cname', isAdmin, async (req, res) => {
  let name = req.body.name;
  let result = await courseDB.lookupByCourseName(name);

  if (!req.session.sessionData.lookupByCourseName.includes(encodeURIComponent(name)))
    req.session.sessionData.lookupByCourseName.push(encodeURIComponent(name));

  res.render('lookupByCourseNameView', { query: name, courses: result });
});

// Lookup by Coordinator (Admins Only)
router.get('/coordinator/:id', isAdmin, async (req, res) => {
  let id = req.params.id;
  let result = await courseDB.lookupByCoordinator(id);

  if (!req.session.sessionData.lookupByCoordinator.includes(id)) req.session.sessionData.lookupByCoordinator.push(id);

  res.format({
    'application/json': () => res.json(result),
    'text/html': () => res.render('coordinatorView', result)
  });
});

// Random Course (Available to all authenticated users)
router.get('/random', async (req, res) => {
  const result = await courseDB.getRandomCourse();

  res.format({
    'application/json': () => res.json(result),
    'text/html': () => res.render('randomView', result)
  });
});

// Course Description (Available to all authenticated users)
router.get('/describe/:id', async (req, res) => {
  let id = req.params.id;
  if (id.startsWith('CS ')) id = id.substring(3);

  let result = await courseDB.getCourseDescription(id);

  if (!req.session.sessionData.courseDescription.includes(id)) req.session.sessionData.courseDescription.push(id);

  res.format({
    'application/json': () => res.json({ query: id, description: result }),
    'text/html': () => res.render('courseDescriptionView', { query: id, description: result })
  });
});

// User Session History (Available to all authenticated users)
router.get('/history', (req, res) => {
  let sessionData = req.session.sessionData;

  let courseIdData = sessionData.lookupByCourseId.map((e) => ({ name: e, displayName: decodeURIComponent(e) }));
  let courseNameData = sessionData.lookupByCourseName.map((e) => ({ name: e, displayName: decodeURIComponent(e) }));

  res.render('sessionView', {
    lookupByCourseId: courseIdData,
    lookupByCourseName: courseNameData,
    lookupByCoordinator: sessionData.lookupByCoordinator,
    courseDescription: sessionData.courseDescription
  });
});

export { router };
