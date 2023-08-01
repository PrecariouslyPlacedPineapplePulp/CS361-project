var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var port = process.env.PORT || 9000
var app = express()
var fs = require('fs')

app.options('/', cors())

app.post('/', bodyParser.json(), cors(), function(req, res, next) {

    // check of level and time exist in request body
    if (req.body.time && req.body.level) {
        console.log('MICROSERVICE: received POST request with:', req.body.time, req.body.level)
    } else {
        console.log('MICROSERVICE: request missing parts')
    }

    // get file contents as a string. Source used: https://www.geeksforgeeks.org/node-js-fs-readfile-method/
    fs.readFile('plans.json', 'utf-8', function(err, data) {
        
        // turn the string into a JSON object
        const dataJSON = JSON.parse(data)

        // get list of workout plans
        const plans = dataJSON.workouts

        // iterate through each plan to find a match
        for (i = 0; i < plans.length; i++) {
            // console.log(plans[i].time)

            // save match to variable target
            if((plans[i].time == req.body.time) && (plans[i].level == req.body.level)) {
                target = plans[i]
            }
        }

        var planWorkouts = target.plan.workouts
        var outputPlan = []

        for (i = 0; i < planWorkouts.length; i++) {
            outputPlan.push([
                Object.keys(planWorkouts[i])[0],
                Object.values(planWorkouts[i])[0]
            ])
        }

        res.json({
            calories: target.calories,
            workouts: outputPlan
        })
    })
})

app.listen(port, function(err) {
    if (err) {
        throw err
    }

    console.log("== Planservice listening on port", port)
})