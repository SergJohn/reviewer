const express = require("express");
const path = require("path");
const fs = require('fs');
const bodyParser = require('body-parser');
const Filter = require('bad-words');

const app = express();
const port = process.env.PORT || "3000";
const filter = new Filter();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, '../public/views'))); //We define the views folder as the one where all static content will be served
app.set('view engine', 'html');
app.use(express.urlencoded({ extended: true })); //We allow the data sent from the client to be coming in as part of the URL in GET and POST requests
app.use(express.json()); //We include support for JSON that is coming from the client


function isValidReview(review) {
    return review.book && review.book.toString().trim() !== '' && 
        review.name && review.name.toString().trim() !== '' &&
        review.content && review.content.toString().trim() !== ''
}


app.get("/", (req, res) => {
    res.render('index');
});

app.get("/books", (req, res) => {
    res.render('books');
});

app.get("/about", (req, res) => {
    res.render('about');
});

app.get('/get/books', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    let content = fs.readFileSync('books.json', 'utf8');
    res.end(content);
});

app.get('/get/reviews', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    let contentReview = fs.readFileSync('reviews.json', 'utf8');
    res.end(contentReview);
});

app.post('/reviews', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    let contentReview = [];
    let review = {
        book: `${filter.clean(req.body.book.toString())}`,
        name: `${filter.clean(req.body.name.toString())}`,
        content: `${filter.clean(req.body.content.toString())}`
    }

    fs.readFile('reviews.json', function(err, data){
        if (err) throw err;
        contentReview = JSON.parse(data);
        contentReview.push(review);
        
        fs.writeFile('reviews.json', JSON.stringify(contentReview, null, " "), err => {
            if (err) throw err;
            console.log('New reviews added!');
        });
    });
    console.log('you have got here');
    // res.redirect('back');
    
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});