import express from 'express';
import { engine } from 'express-handlebars';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import Handlebars from 'handlebars';
import mongoose from 'mongoose';
import { dbURL } from './credentials.js';

// Import user model
import { getUserByUsername } from './models/User.js';

// Initialize Express
const app = express();

// ✅ Connect to MongoDB and Verify Connection
mongoose
  .connect(dbURL)
  .then(() => console.log(`✅ Connected to MongoDB: ${dbURL}`))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Setup Handlebars view engine
app.engine(
  'handlebars',
  engine({
    defaultLayout: 'main',
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    }
  })
);

Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

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
    saveUninitialized: false,
    cookie: { secure: false }
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Passport Local Strategy for Authentication
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log(`🔍 Attempting login for: ${username}`);
      const user = await getUserByUsername(username);

      if (!user) {
        console.log('❌ User not found:', username);
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (!user.password) {
        console.log('❌ User password is missing:', user);
        return done(null, false, { message: 'User data is corrupted' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        console.log('❌ Incorrect password for:', username);
        return done(null, false, { message: 'Incorrect password' });
      }

      console.log('✅ Login successful:', username);
      return done(null, user);
    } catch (error) {
      console.error('❌ Error during authentication:', error);
      return done(error);
    }
  })
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      console.log('❌ User not found during deserialization:', username);
      return done(new Error('User not found'));
    }
    done(null, user);
  } catch (error) {
    console.error('❌ Error during deserialization:', error);
    done(error);
  }
});

// Debugging: Log Session & User Info
app.use((req, res, next) => {
  console.log('🔍 Current session:', req.session);
  console.log('🔍 Current user:', req.user);
  res.locals.user = req.user;
  next();
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
  console.log('🚀 Server running at http://localhost:3000');
});
