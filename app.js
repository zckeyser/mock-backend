const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json());

app.use(function (req, res, next) {
    res.header("Content-Type",'application/json');
    next();
});

// testing routes go here

app.get("/", function(req, res) {
    res.send("This is the homepage!")
});

app.put('/marrywizardapi/api/BookKeeping/MatchedWeeks/Cancel', function(req, res) {
    if(req.body.MarriedProposalId && req.body.CancellationDate) {
        res.status(200);
        res.send(JSON.stringify({Success:true}));   
    }
    else {
        res.status(400);
        res.send(JSON.stringify({Success:false}));
    }
});

// end routes

app.listen(port, () => console.log(`listening on port ${port}!`))