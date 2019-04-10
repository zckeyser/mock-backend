const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json());

app.use(function (req, res, next) {
    res.header("Content-Type",'application/json');
    next();
});

// testing routes go here



// end routes

app.listen(port, () => console.log(`listening on port ${port}!`))