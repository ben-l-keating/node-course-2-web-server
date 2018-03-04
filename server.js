//3rd party modules
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//port const
const port = process.env.PORT || 3000;

//creates the app
var app = express();

//express settings
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//add middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFileSync('server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

//registers public folder for static pages
app.use(express.static(__dirname + '/public'));

//http route handlers
app.get('/', (req, res) => {
  //res.send('<h1>hello express</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMessage: 'Hello Ben, you like boobies'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});
app.get('/bad', (req, res) => {
  res.send({
    errorCode: 001,
    errorMessage: 'You did something wrong you twat.'
  });
});


// starts app listening to a port (3000) on machine
app.listen(port, () =>{
  console.log(`Server is up on port ${port}.`);
});
