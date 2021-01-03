
console.log('Hello World');

/**
 * File created to handle the POST submission
 * getting the data from user input to make a
 * new review
*/

// Getting the form from the DOM
const form = document.querySelector('form');

// Declaring a variable with the gitpod address
const API_URL = 'https://3000-d3f322ab-7404-43e7-aab7-5032e8f9499b.ws-eu03.gitpod.io/reviews';

// Adding an event listener
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let book = document.getElementById('book').value;
    let name = document.getElementById('name').value;
    let content = document.getElementById('content').value;

    console.log(book);
    console.log(name);
    console.log(content);

    let updateReviews = {
            book,
            name,
            content
        }

// Fetching the data to the BackEnd
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(updateReviews),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
        .then(createdReview => {
            console.log(createdReview);
        });

// Cleaning the form and refreshing the browser to be used again
    form.reset();
    alert("Thanks for your review!");
    location.reload();
});