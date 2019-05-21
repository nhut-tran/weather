const path = require('path')
const express = require('express');
const hbs = require('hbs');
const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;
app.use(express.static(publicDirectoryPath));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.get('', (req, res)=>{
    res.render('index', {
        name:'Weather',
        info: 'Enter address to get the Weather forecast !!!!!!'
    })
})
app.get('/about', (req, res)=>{
    res.render('about', {
        name:'About',
        info: 'this is about me'
    })
})
app.get('/help', (req, res)=>{
    res.render('help', {
        name:'Helps',
        info:'this is some useful help'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
       return res.send({
        error:'no address'
            
        })
    }

    geocode(req.query.address, (error, geodata ={})=>{
        if(error){
            res.send({
               error 
            })
        }else{
            
            forecast(geodata.lat, geodata.long, (error, data)=>{
                if(error){
                    res.send({
                        error
                     })
                }else{
                
                res.send({
                summary: data.summary,
                temp: data.temp,
                RainProbility: data.RainProbility,
                location: geodata.location
            })
                } 
            
        })
        }
        

    })
    
})
app.get('/help/*', (req, res)=>{
    res.render('404', {
        name: 'help 404',
        info:'this artical not exist'
    })
});
app.get('*', (req, res)=>{
    res.render('404', {
        name:'404',
        info: 'Page not found',
    })
});
app.listen(port, ()=>{
    console.log('server is up on' + port)
});