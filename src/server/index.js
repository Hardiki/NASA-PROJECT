require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fetch = require('node-fetch')
const path = require('path')
const indexRouter = require('./route')

const app = express()
const port = 3000
// view engine setup
app.set('views', path.join(__dirname, '../public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, '../public')));

// your API calls
app.use('/', indexRouter)
// example API call
app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))