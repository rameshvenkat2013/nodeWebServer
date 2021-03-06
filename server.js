
const express = require('express');
const hbs = require('hbs');

const fs = require('fs');

const port = process.env.PORT || 100;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
//app.use(express.static(__dirname + '/assets'));

app.use((req,res,next) => {
    var now = new Date().toString();
    log ='Now the time is : ' + now + ' - ' + req.url + ' - ' + req.method;
    console.log(log + ' - ' + port);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('unable to write to server.log');
        }
        next();
    });
    //fs.writeFileSync('timestamp.hbs', 'Now the time is : ' , now , ' - ' , req.url , ' - ' , req.method);
    
});

hbs.registerHelper('getCurYear', () => {
    return new Date().getFullYear();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMsg : 'Welcome to handlebars templating system',
        pagetitle : 'About Express'        
    })
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pagetitle : 'About Express'
    })
});


app.get('/project', (req, res) => {
    res.render('project.hbs', {
        pagetitle : 'As an asynchronous event driven JavaScript runtime, Node is designed to build scalable network applications. In the following "hello world" example, many connections can be handled concurrently. Upon each connection the callback is fired, but if there is no work to be done, Node will sleep.'
    })
});



app.get('/bad', (req, res) => {
    res.send({
        errorMessage : 'Unable to process the request'
    });
});

app.listen(port, () => {
    console.log('Server is up with port', port);
});