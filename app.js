const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
require('dotenv').config();
const { isLoggedIn, isAdmin, isEmployeeOrAdmin } = require('./middleware');

mongoose.connect('mongodb://127.0.0.1:27017/gym');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'))

const sessionConfig = {
    secret: 'thisisasecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.get('/', (req, res) => {
    res.render('home');
});

const roomRoutes = require('./routes/rooms');
const equipmentRoutes = require('./routes/equipments');
const memberRoutes = require('./routes/members');
const membershipRoutes = require('./routes/memberships');
const employeeRoutes = require('./routes/employees');
const memberFeedbackRoutes = require('./routes/memberFeedbacks');
const userRoutes = require('./routes/users');
const enrollRoutes = require('./routes/enroll');

app.use('/rooms', roomRoutes);
app.use('/equipments', equipmentRoutes);
app.use('/members', memberRoutes);
app.use('/memberships', membershipRoutes);
app.use('/employees', isLoggedIn, isEmployeeOrAdmin, employeeRoutes);
app.use('/memberFeedbacks', memberFeedbackRoutes);
app.use('/', userRoutes);
app.use('/enroll', enrollRoutes);

app.get('/admin', isLoggedIn, isAdmin, (req, res) => {
    res.render('admin');
});

app.get('/', (req, res) => {
    if (req.user && req.user.role === 'admin') {
        return res.redirect('/admin');
    }
    res.render('home');
});

app.listen(3000, () => {
    console.log('Serving on port 3000');
});
