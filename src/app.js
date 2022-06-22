const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views locaiton
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve //index
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Gabriel Tellez'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About',
        name: 'Gabriel Tellez'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        name: 'Gabriel Tellez',
        message: 'This is the help page'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an Address'
        })
    }
        geocode(req.query.address, (error, {longitude, latitude, location} = {})=>{
        if(error){
            return res.send({error})
        }
    
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        title: '404',
        name: 'Gabriel Tellez',
        errorMessage: 'Help article not found.'
    })
})
app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Gabriel Tellez',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})