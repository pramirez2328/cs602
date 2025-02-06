import express from 'express';

const app = express();

// setup handlebars view engine
import { engine } from 'express-handlebars';

app.engine('handlebars', 
		engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// static resources
app.use(express.static('./public'));


// to parse request body
app.use(express.urlencoded({extended: false}));
app.use(express.json());

import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

// cookie-parser first
app.use(cookieParser());
// session 
app.use(expressSession(
	{ secret: 'cs602-secret',
	  resave: false, 
	  saveUninitialized: false }));


// Routing
import {router as routes} from 
    './routes/index.js';

app.use('/', routes);


app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

app.listen(3000, function(){
  console.log('http://localhost:3000');
});




