const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();
app.set('veiw engine', 'hbs');


hbs.registerPartials(__dirname + '/views/partials') //dynamic include in dom
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

hbs.registerHelper('toUpper', (text) => {
  return text.toUpperCase();
})

app.use((req, res, next) => {  //medilwaire

  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
})
// app.use((req, res, next) => {
//   res.render('test.hbs');
// })

app.use(express.static(__dirname + '/public')); //localhost/help.html
// app.get('/', (request, response) => {  //static
//    response.send({
//      name: 'ahmed',
//      like: ['writing', 'running', 'football']
//    })
// })
app.get('/', (req, res) => { //dynamic
    res.render('home.hbs', {
      pageTitle: 'About Page',
      greating: 'Welcome Page'

  })
})
app.get('/project', (req, res) => { //dynamic
    res.render('home.hbs', {
      pageTitle: 'About Page',

  })
})
app.get('/about', (request, response) => {

  response.render('about.hbs', { //dynamic
    greating: 'Welcome Page',
    pageTitle: 'About Page',
  })
  // response.send('<h2>welcome node server</h2>'); //static
})

app.get('/bad', (request, response) => {
  response.send({
    errorMsg : 'page not found'
  })
})


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})
