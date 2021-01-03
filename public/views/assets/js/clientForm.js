
console.log('Hello World');

const form = document.querySelector('form');
const API_URL = 'https://3000-d3f322ab-7404-43e7-aab7-5032e8f9499b.ws-eu03.gitpod.io/reviews';

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
    console.log('after fetch');
    form.reset();
    alert("Thanks for your review!");
    location.reload();
});