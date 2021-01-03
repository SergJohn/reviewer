const express = require("express"); //This module allows this app to respond to HTTP Requests, defines the routing and renders back the required content
const path = require("path"); // path module will help us to define the correct paths
const fs = require('fs'); // Requering the file system module to read and write files
const bodyParser = require('body-parser'); // body-parse module to parse our JSON data
const Filter = require('bad-words'); // This module will create a filter to prevents the reviews content to be used with bad words

const app = express(); //We set our routing to be handled by Express
const port = process.env.PORT || "3000"; // Declaring the port to be used by the variable
const filter = new Filter(); // Instatiating the filter

app.use(bodyParser.json()); // Using the parse json
app.use(bodyParser.urlencoded({ extended: false })); //Did not allowed the data sent from the client to be coming in as part of the URL in GET and POST requests

app.use(express.static(path.resolve(__dirname, '../public/views'))); //We define the views folder as the one where all static content will be served
app.use(express.urlencoded({ extended: true })); //We allow the data sent from the client to be coming in as part of the URL in GET and POST requests
app.use(express.json()); //We include support for JSON that is coming from the client

/**
 * this function will gets the variables and tranforms them into 
 * strings and will trims them in case they are actually an input
*/
function isValidReview(review) {
    return review.book && review.book.toString().trim() !== '' && 
        review.name && review.name.toString().trim() !== '' &&
        review.content && review.content.toString().trim() !== ''
}

/**
 * routes
*/
app.get("/", (req, res) => {
    res.render('index');
});

app.get("/books", (req, res) => {
    res.render('books');
});

app.get("/about", (req, res) => {
    res.render('about');
});

// Reading books json file
app.get('/get/books', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    let content = fs.readFileSync('books.json', 'utf8');
    res.end(content);
});

// Reading reviews json file
app.get('/get/reviews', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    let contentReview = fs.readFileSync('reviews.json', 'utf8');
    res.end(contentReview);
});

// POST endpoint to REVIEWS
app.post('/reviews', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    let contentReview = [];

    // Using filter to clean the data which came of FrontEnd
    let review = {
        book: `${filter.clean(req.body.book.toString())}`,
        name: `${filter.clean(req.body.name.toString())}`,
        content: `${filter.clean(req.body.content.toString())}`
    }

    // Reading the JSON file
    fs.readFile('reviews.json', function(err, data){
        if (err) throw err;
        contentReview = JSON.parse(data);

        // Updating the content 
        contentReview.push(review);
        
        // Writting the updated data on the JSON file
        fs.writeFile('reviews.json', JSON.stringify(contentReview, null, " "), err => {
            if (err) throw err;
            console.log('New reviews added!');
        });
    });
    console.log('you have got here');
    // res.redirect('back');
    
});

// Starting the server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});