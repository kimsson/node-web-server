const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.port || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

// middleware
// dir

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(`${now}: ${req.method} ${req.url}`);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  })
  next();
})

  // app.use((req, res, next) => {
  //   res.render('maintenance.hbs', {
  //     pageTitle: 'Hold on',
  //     pageDescription: 'This site is currently being updated.'
  //   })
  // })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (str) => {
  return str.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('index.hbs', {
    pageTitle: 'Home page',
    pageDescription: 'Welcome to my page'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page '
  })
})

app.get('/bad', (req, res) => {
  res.send({
    Error: 404,
    Message: 'Unable to handle request'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
