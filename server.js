const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//Partials
hbs.registerPartials(__dirname + '/views/partials')

// key value pairs
app.set('view engine', 'hbs');


// middleware goes from top to bottom
// next exists so you can tell express when middleware function is done
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

//middleware app.use
app.use(express.static(__dirname + '/public'));

// parameters: name of helper, function to run
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
// req stores a ton of information of the request coming in
// res has a bunch of methods available to you, customize how you respond
// '/' is the root webpage
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!<h1>');
    res.render(__dirname + '/views/home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: "Welcome to my website"
    });
});

// localhost:3000/about
app.get('/about', (req, res) => {
    res.render(__dirname + '/views/about.hbs', {
        pageTitle: 'About Page'
    });
});

// /bad
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
