var express = require("express")
var exphbs = require("express-handlebars")
const bodyParser = require("body-parser");

var port = process.env. PORT || 8000;

var app = express()

app.engine('handlebars', exphbs.engine({
    defaultLayout: "main"
}))

app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get("/", function(req, res, next) {
    res.status(200).render("mainPage")
})

app.listen(port, function(err) {
    if (err) {
        throw err
    }

    console.log("== Server listening on port", port)
})