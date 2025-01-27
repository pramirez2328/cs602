import express from 'express';

const router = express.Router();

// Use the course module
import * as courseDB from '../courseModule.js';

// router specs

router.use(function (req, res, next){
  if (req.session.sessionData === undefined) {
    req.session.sessionData = {
      'lookupByCourseId': [],
      'lookupByCourseName': [],
      'lookupByCoordinator': [],
      'courseDescrition': []
    };
  }
  next();
});

// GET request to the homepage

router.get('/', function (req, res){
  res.render('homeView');
});


router.get('/cid', async function(req, res) {
  if (req.query.id) {
    let id = req.query.id;
    let result = await courseDB.lookupByCourseId(id);

    if (!req.session.sessionData['lookupByCourseId'].includes(encodeURIComponent(id)))
      req.session.sessionData['lookupByCourseId'].push(encodeURIComponent(id));

    res.render('lookupByCourseIdView', 
      {query: id, courses: result});
  } else {
    res.render('lookupByCourseIdForm');
  }
});

router.post('/cid', async function(req, res) {
  let id = req.body.id;
  let result = await courseDB.lookupByCourseId(id);

  if (!req.session.sessionData['lookupByCourseId'].includes(encodeURIComponent(id)))
      req.session.sessionData['lookupByCourseId'].push(encodeURIComponent(id));

    
  res.render('lookupByCourseIdView', 
    {query: id, courses: result});
});


router.get('/cid/:id', async function(req, res) {
  let id = req.params.id;
  
  // Fill in the code

});


router.get('/cname', async function(req, res) {
  
  // Fill in the code

});

router.post('/cname', async function(req, res) {
  
  // Fill in the code

});

router.get('/cname/:name', async function(req, res) {
  
  // Fill in the code

});

router.get('/random', async function (req, res) {
  
  // Fill in the code
  
});

router.get('/describe/:id', async function (req, res) {
  
  // Fill in the code

});


router.get('/coordinator/:id', async function (req, res) {
  
  // Fill in the code

});
  
router.get('/history', function (req, res) {

  // Fill in the code
  
});




export {router};