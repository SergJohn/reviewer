const express = require("express");
const path = require("path");
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || "5000";


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, '../public/views'))); //We define the views folder as the one where all static content will be served
app.set('view engine', 'html');
app.use(express.urlencoded({extended: true})); //We allow the data sent from the client to be coming in as part of the URL in GET and POST requests
app.use(express.json()); //We include support for JSON that is coming from the client

app.get("/", (req, res) => {
  res.render('index');
});

app.get("/books", (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('books.json', (err, data) => {
        if (err) throw err;
        let books = JSON.parse(data);
        // console.log(books);

        res.end(JSON.stringify(books));
    });
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});