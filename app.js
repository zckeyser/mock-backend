const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routeConfigs = require('./routeConfig.js')

app.use(express.json());

function getInputValidationFunction(configuredInput) {
    return (req) => {
        var body = req.body;

        for(var property in Object.keys(configuredInput)) {
            // for each configured required input value, make sure it exists + is the right type (type check handles both parts)
            if(typeof(body[property]) !== typeof(configuredInput[property])) {
                return `Mismatch on property ${property}: request had type ${typeof(body[property])}, expected type was ${typeof(body[property])}`;
            }
        }

        return null;
    }
}

function getFunctionForVerb(verb) {
    if(verb === "GET") {
        return app.get;
    } else if(verb === "POST") {
        return app.post;
    } else if(verb === "PUT") {
        return app.put;
    } else if(verb === "DELETE") {
        return app.delete;
    } else if(verb === "PATCH") {
        return app.patch;
    }
}

function createRoute(config) {
    var routeFunction = getFunctionForVerb(config.method);

    if(config.input) {
        var inputValidationFunction = getInputValidationFunction(config.input);
    }

    var routeHandler = (req, res) => {
        // do any input validation that we needed
        var validationResult = inputValidationFunction(req);
        if(validationResult) {
            res.status(400);
            res.send(validationResult);
            return;
        }

        // return the expected content
        res.status(config.status);
        res.send(JSON.stringify(config.body));
    };

    // apply the created handler to the correct route + method
    routeFunction(config.route, routeHandler);
}

for(var config in routeConfigs) {
    createRoute(config);
}

// testing routes go here
app.get("/", function(req, res) {
    res.send("This is the homepage!");
});

// end routes

app.listen(port, () => console.log(`listening on port ${port}!`))