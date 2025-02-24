import express from 'express';
import { engine } from 'express-handlebars';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import Handlebars from 'handlebars';

// Import user model (to be created later)
import { getUserByUsername } from './models/User.js';

// Initialize Express
const app = express();

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
    resave: false, // 🔹 Prevent unnecessary resaving
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, sameSite: 'lax' } // ✅ Allow cookies in local development
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy for Authentication
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await getUserByUsername(username); // ✅ Fix: Added `await`
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
  })
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  try {
    const user = await getUserByUsername(username);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Routes
import { router as routes } from './routes/index.js';
app.use('/', routes);

// 404 Error Handling
app.use((req, res) => {
  res.status(404);
  res.render('404');
});

app.use((req, res, next) => {
  console.log('🔍 Current session:', req.session);
  console.log('🔍 Current user:', req.user);
  next();
});

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

// Start server
app.listen(3000, function () {
  console.log('http://localhost:3000');
});
