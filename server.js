
const express = require('express');
const hbs = require('hbs');

const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
//app.use(express.static(__dirname + '/assets'));

app.use((req,res,next) => {
    var now = new Date().toString();
    log ='Now the time is : ' + now + ' - ' + req.url + ' - ' + req.method;
    console.log(log);
    fs.appendFile('server22.log', log + '\n', (err) => {
        if(err){
            console.log('unable to write to server.log');
        }else{
            console.log('inside else');
            next();
        }
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


app.get('/bad', (req, res) => {
    res.send({
        errorMessage : 'Unable to process the request'
    });
});

app.listen(100);