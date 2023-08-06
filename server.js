var express = require('express')
var exphbs = require('express-handlebars')
const bodyParser = require('body-parser');

var port = process.env. PORT || 8000;

var app = express()

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', function(req, res, next) {
    res.status(200).render('mainPage')
})

// https://stackoverflow.com/questions/26079611/node-js-typeerror-path-must-be-absolute-or-specify-root-to-res-sendfile-failed
app.get('/modules/ui_interactions', function(req, res, next) {
    res.status(200).sendFile(__dirname + '\\public\\modules\\ui_interactions.js')
})

app.get('/modules/ui_inputs', function(req, res, next) {
    res.status(200).sendFile(__dirname + '\\public\\modules\\ui_inputs.js')
})

app.get('/modules/process_charts', function(req, res, next) {
    res.status(200).sendFile(__dirname + '\\public\\modules\\process_charts.js')
})

// app.post('/new', function (req, res, next) {
//     if (req.body && req.body.name && req.body.stats) {
//         next()
//     } else {
//         res.status(400)
//     }
// }, function (req, res, next) {
//     var newEntry = {
//         name: req.body.name,
//         stats: req.body.stats
//     }
// })

app.listen(port, function(err) {
    if (err) {
        throw err
    }

    console.log('== Server listening on port', port)
})