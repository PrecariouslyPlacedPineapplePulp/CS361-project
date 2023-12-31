# CS361-project


## Microservice communication contract

### What to send

This microservice is for my partner's project. It is located under the directory called "microservice" in this repo. To run it, type "node planservice" in your terminal. To communicate with it, send HTTP requests to http://localhost:9000/, with method "POST" and mode "cors". In the body of the HTTP request, include a JS object with keys

- time, which can be "15", "30", "45", or "60" (note that these are strings).
- level, which can be "easy", "medium", or "hard".

Here is an example:

    fetch('http://localhost:9000/', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            level: 'easy',
            time: '15'
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(res) {
        return res.json()
    }).then(function(plan) {
        // do something with the plan here
    })

### What you'll receive

From this input, the microservice will go through a list of workout plans and find a matching plan with the requested specifications and return a JS object with two keys: calories and workouts. Under "calories" is the number of calories that the plan will burn, and under "workouts" are the specific exercises under the requested plan, along with their corresponding times, as a list of lists.

For example, if we wanted to print out the microservice's response to the console, then under the second .then function, we would put this:

    console.log(plan.calories)
    console.log(plan.workouts)

This is what shows up on the console:

<img src="https://github.com/PrecariouslyPlacedPineapplePulp/CS361-project/blob/main/microservice/img/console_output.png" width="400">

### UML Diagram

<img src="https://github.com/PrecariouslyPlacedPineapplePulp/CS361-project/blob/main/microservice/img/uml_diagram.png" width="500">