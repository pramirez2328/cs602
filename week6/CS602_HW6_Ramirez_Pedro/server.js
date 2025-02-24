import express from 'express';
import { engine } from 'express-handlebars';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

// Import user model (to be created later)
import { getUserByUsername } from './models/User.js';

// Initialize Express
const app = express();

// Setup Handlebars view engine
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Static resources
app.use(express.static('./public'));

// Parse request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cookie and session handling
app.use(cookieParser());
app.use(
  expressSession({
    secret: 'cs602-secret',
    resave: false,
    saveUninitialized: false
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy for Authentication
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = getUserByUsername(username);
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  })
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  const user = getUserByUsername(username);
  done(null, user);
});

// Routes
import { router as routes } from './routes/index.js';
app.use('/', routes);

// 404 Error Handling
app.use((req, res) => {
  res.status(404);
  res.render('404');
});

// Start server
app.listen(3000, function () {
  console.log('http://localhost:3000');
});
