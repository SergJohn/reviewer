console.log('client javascript running');

const booksElement = document.getElementById('books');
const xhttp = new XMLHttpRequest();

(function () {
    requestBooks();
}());

function requestBooks() {

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            bookRender(data);
        }
    };
    xhttp.open("GET", "/get/books", true);
    xhttp.send();
}

async function bookRender(data) {
    console.log(data.books[0]);


    for (var i = 0; i < data.books.length; i++) {

        // Creating an external DIV to hold the books data to be displayed
        let div = document.createElement('DIV');
        div.classList.add('separator');

        // H1 to hold book's name
        let h1 = document.createElement('H1');
        h1.classList.add('text-light');
        h1.classList.add('text-uppercase');
        // h1.classList.add('bg-dark');
        h1.innerHTML = data.books[i].title;

        // Appending book's name to the DIV
        div.appendChild(h1);

        // Elemente to hold the author's name
        let h3 = document.createElement('H3');
        h3.classList.add('text-light');
        h3.textContent = data.books[i].author;

        // Appending the author's name to the DIV
        div.appendChild(h3);

        // BUTTON to toggle the reviews and form
        let btn = document.createElement('BUTTON');
        btn.classList.add('btn-primary');

        // Creating elements to make the toggle available using bootstrap
        let att = document.createAttribute('data-toggle');
        att.value = "collapse";
        let att2 = document.createAttribute('data-target');
        att2.value = "#openForm";
        btn.setAttributeNode(att);
        btn.setAttributeNode(att2);

        btn.innerHTML = "Check Reviews";

        // Appending the BUTTON to the DIV
        div.appendChild(btn);

        // Appending the external DIV to the MAIN DIV
        booksElement.appendChild(div);

        // Creating a new div to hold the element clicked
        let divToggle = document.createElement('DIV');
        divToggle.classList.add('collapse');
        divToggle.classList.add('text-light');
        divToggle.classList.add('separator');

        // Inserting the necessary id to make it work
        let id = document.createAttribute('id');
        id.value = "openForm";
        divToggle.setAttributeNode(id);

        // Retreiving the data inside the new DIVTOGGLE
        let p = document.createElement('P');
        p.innerHTML = data.books[i].title;

        // Appending to the MAIN DIV
        divToggle.appendChild(p);
        // booksElement.appendChild(divToggle);

        // Calling function to get the available reviews
        let availableReviews = await requestReview();
        console.log(availableReviews.reviews[0].name);

        for (var j = 0; j < availableReviews.reviews.length; j++) {
            // Creating element to add the reviews
            let nameP = document.createElement('P');
            nameP.innerHTML = availableReviews.reviews[j].name;

            if (availableReviews.reviews[j].book === data.books[i].title) {
                divToggle.appendChild(nameP);
                booksElement.appendChild(divToggle);
            }
        }



    }

    async function requestReview() {

        let test = await fetch('/get/reviews')
            .then(response => response.json())
            .then(data => data);

        return test;
    }

}