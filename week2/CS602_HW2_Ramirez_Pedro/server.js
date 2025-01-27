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

app.get('/', (req, res) => {
  res.status(200).render('homeView');
});

app.get('/random', (req, res) => {
  const result = courseDB.getRandomCourse();
  res.status(200).render('randomView', result);
});

app.get('/cid', (req, res) => {
  if (req.query.id) {
    let id = req.query.id;
    let result = courseDB.lookupByCourseId(id);
    res.status(200).render('lookupByCourseIdView', { query: id, courses: result });
  } else {
    res.status(200).render('lookupByCourseIdForm');
  }
});

app.post('/cid', (req, res) => {
  let id = req.body.id;
  let result = courseDB.lookupByCourseId(id);
  res.status(200).render('lookupByCourseIdView', { query: id, courses: result });
});

app.get('/cid/:id', (req, res) => {
  let id = req.params.id;
  let result = courseDB.lookupByCourseId(id);

  res.format({
    'application/json': () => {
      res.status(200).json({ query: id, courses: result });
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
      res.status(200).type('application/xml').send(coursesXml);
    },

    'text/html': () => {
      res.status(200).render('lookupByCourseIdView', { query: id, courses: result });
    },

    'text/plain': () => {
      let coursesText =
        `Query: ${id}\n` + result.map((course) => `${course.course_id}: ${course.course_name}`).join('\n');
      res.status(200).type('text/plain').send(coursesText);
    },

    default: () => {
      res.status(404).send('404');
    }
  });
});

app.get('/cname', (req, res) => {
  if (req.query.name) {
    let name = req.query.name;
    let result = courseDB.lookupByCourseName(name);
    res.status(200).render('lookupByCourseNameView', { query: name, courses: result });
  } else {
    res.status(200).render('lookupByCourseNameForm');
  }
});

app.post('/cname', (req, res) => {
  let name = req.body.name;
  let result = courseDB.lookupByCourseName(name);
  res.status(200).render('lookupByCourseNameView', { query: name, courses: result });
});

app.get('/cname/:name', (req, res) => {
  let name = req.params.name;
  console.log('name', name);
  let result = courseDB.lookupByCourseName(name);

  res.format({
    'application/json': () => {
      res.status(200).json({ query: name, courses: result });
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
      res.status(200).type('application/xml').send(coursesXml);
    },

    'text/html': () => {
      res.status(200).render('lookupByCourseNameView', { query: name, courses: result });
    },

    'text/plain': () => {
      let coursesText =
        `Query: ${name}\n` + result.map((course) => `${course.course_id}: ${course.course_name}`).join('\n');
      res.status(200).type('text/plain').send(coursesText);
    },

    default: () => {
      res.status(404).send('404');
    }
  });
});

app.use(function (req, res) {
  res.status(404).render('404');
});

app.listen(3000, function () {
  console.log('http://localhost:3000');
});
