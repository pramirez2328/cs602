import express from 'express';

const app = express();

// setup handlebars view engine
import { engine } from 'express-handlebars';

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

// static resources
app.use(express.static('./public'));

// to parse request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use the course module
import * as courseDB from './courseModule.js';

// GET request to the homepage

app.get('/', function (req, res) {
  res.render('homeView');
});

app.get('/random', function (req, res) {
  const result = courseDB.getRandomCourse();
  res.render('randomView', result);
});

app.get('/cid', function (req, res) {
  if (req.query.id) {
    let id = req.query.id;
    let result = courseDB.lookupByCourseId(id);
    res.render('lookupByCourseIdView', { query: id, courses: result });
  } else {
    res.render('lookupByCourseIdForm');
  }
});

app.post('/cid', function (req, res) {
  let id = req.body.id;
  let result = courseDB.lookupByCourseId(id);
  res.render('lookupByCourseIdView', { query: id, courses: result });
});

app.get('/cid/:id', function (req, res) {
  let id = req.params.id;
  let result = courseDB.lookupByCourseId(id);

  res.format({
    'application/json': () => {
      res.json({ query: id, courses: result });
    },

    'application/xml': () => {
      let coursesXml =
        `<?xml version="1.0"?>\n<courses id="${id}">\n` +
        result
          .map((course) => {
            return `  <course>\n    <course>${course.course_id}</course>\n    <name>${course.course_name}</name>\n  </course>`;
          })
          .join('\n') +
        `\n</courses>`;
      res.type('application/xml').send(coursesXml);
    },

    'text/html': () => {
      res.render('lookupByCourseIdView', { query: id, courses: result });
    },

    'text/plain': () => {
      let coursesText =
        `Query: ${id}\n` + result.map((course) => `${course.course_id}: ${course.course_name}`).join('\n');
      res.type('text/plain').send(coursesText);
    },

    default: () => {
      res.status(404);
      res.send('<b>404 - Not Found</b>');
    }
  });
});

app.get('/cname', function (req, res) {
  res.render('lookupByCourseNameForm');
});

app.post('/cname', function (req, res) {
  let name = req.body.name;
  let result = courseDB.lookupByCourseName(name);
  res.render('lookupByCourseNameView', { query: name, courses: result });
});

app.get('/cname/:name', function (req, res) {
  let name = req.params.name;
  let result = courseDB.lookupByCourseName(name);

  // Fill in the code for JSON, XML, and HTML formats
  res.format({
    'application/json': () => {
      res.json({ query: name, courses: result });
    },

    'application/xml': () => {
      let coursesXml =
        `<?xml version="1.0"?>\n<courses name="${name}">\n` +
        result
          .map((course) => {
            return `  <course>\n    <course>${course.course_id}</course>\n    <name>${course.course_name}</name>\n  </course>`;
          })
          .join('\n') +
        `\n</courses>`;
      res.type('application/xml').send(coursesXml);
    },

    'text/html': () => {
      res.render('lookupByCourseNameView', { query: name, courses: result });
    },

    'text/plain': () => {
      let coursesText =
        `Query: ${name}\n` + result.map((course) => `${course.course_id}: ${course.course_name}`).join('\n');
      res.type('text/plain').send(coursesText);
    },

    default: () => {
      res.status(404);
      res.send('<b>404 - Not Found</b>');
    }
  });
});

app.use(function (req, res) {
  res.status(404);
  res.render('404');
});

app.listen(3000, function () {
  console.log('http://localhost:3000');
});
