var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

require('dotenv').config();
var fileUpload = require('express-fileupload'); // M5U3 Subir imagenes

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var noticiasRouter = require('./routes/noticias');
var loginRouter = require('./routes/admin/login'); // M4U4 Login
var adminRouter = require('./routes/admin/noticias'); // M4U4 Login
var tablasRouter = require('./routes/admin/tablas');
var indexadminRouter = require('./routes/admin/index');


var app = express();
var pool = require('./modelo/bd');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// SESION Y MIDDLEWARE
app.use(session({
  secret: 'PalabraSecreta123',
  resave: false,
  saveUninitialized: true 
}));

// INICIO login autentificacion
secured = async (req, res, next) => {
  try {
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else{
      res.redirect('/admin/login')
    }
  } catch (error) {
    console.log(error);
  }
}
//FIN login autentificacion

// Acceso a Cloudinary
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/noticias', noticiasRouter);
app.use('/admin/login', loginRouter); // M4U4 Login
app.use('/admin/noticias', secured, adminRouter); // M4U4 Login
app.use('/admin/tablas', secured, tablasRouter);
app.use('/admin/index', secured, indexadminRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

