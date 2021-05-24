let path = require("path")
let express = require("express")
let hbs = require('hbs')
const forecast = require('./utils/forecast')

let app = express()

let port = process.env.PORT || 3000

let publicDirPath = path.join(__dirname, "../public")
let templatePath = path.join(__dirname, "../templates/views")
let partialPath = path.join(__dirname, "../templates/partials")

app.set('view engine', 'hbs')
app.set('views', templatePath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        'title': 'Weather',
        'name': 'Pathik Vejani'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            'error': "You must provide an address"
        })
    }

    forecast(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error })
        }
        res.send({
            // 'data': data,
            'location': data.location.name + ', ' + data.location.country,
            'temperature': data.current.temperature,
            'weather_desc': data.current.weather_descriptions,
            'humidity': data.current.humidity
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'About Me',
        'name': 'Pathik Vejani'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        'title': '404',
        'name': 'Pathik Vejani',
        'message': 'Page not found'
    })
    // res.send("404 page!")
})

app.listen(port, () => {
    console.log('Server is up on the port ' + port + '!')
})