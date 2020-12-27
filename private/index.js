const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || "5000";

app.use(express.static(path.resolve(__dirname, '../public/views'))); //We define the views folder as the one where all static content will be served
app.use(express.urlencoded({extended: true})); //We allow the data sent from the client to be coming in as part of the URL in GET and POST requests
app.use(express.json()); //We include support for JSON that is coming from the client

app.get("/", (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});