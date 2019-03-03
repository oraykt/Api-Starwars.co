const app = require('express')();
const request = require('request');
const fs = require('fs');
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    const date = new Date().toString();
    const log = date + " " + req.url;
    console.log(log);

    fs.appendFile("server.log", log + "\n", (err) => {
        if (err) {
            console.log(error);
        }
    })
    next();
});

app.use((req, res, next) => {
    res.send("Maintenance");
})

app.get('/', (req, res) => {
    res.render('search');
});

app.get('/results', (req, res) => {

    const keyword = req.query.keyword;
    const url = "https://swapi.co/api/people/?search=" + keyword;
    request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const data = JSON.parse(body);
            res.render('results', {
                data
            });
        }
    });
});

app.listen(process.env.PORT);