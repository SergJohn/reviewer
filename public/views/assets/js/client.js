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
        h1.innerHTML = data.books[i].title;

        // Appending book's name to the DIV
        div.appendChild(h1);

        // Elemente to hold the author's name
        let h3 = document.createElement('H3');
        h3.classList.add('text-light');
        h3.textContent = data.books[i].author;

        // Appending the author's name to the DIV
        div.appendChild(h3);

        let divForBtn = document.createElement('DIV');
        divForBtn.classList.add('separator-in-col');

        // BUTTON to toggle the reviews and form
        let btn = document.createElement('BUTTON');
        btn.classList.add('btn-to-reviews');

        let btnForm = document.createElement('BUTTON');
        btnForm.classList.add('btn-to-reviews');

        // Creating elements to make the toggle available using bootstrap
        let att = document.createAttribute('data-toggle');
        att.value = "collapse";
        let att2 = document.createAttribute('data-target');
        att2.value = "#openReview";
        btn.setAttributeNode(att);
        btn.setAttributeNode(att2);

        btn.innerHTML = "Check Reviews";

        let attForm = document.createAttribute('data-toggle');
        attForm.value = "collapse";
        let attForm2 = document.createAttribute('data-target');
        attForm2.value = "#openForm";
        btnForm.setAttributeNode(attForm);
        btnForm.setAttributeNode(attForm2);

        btnForm.innerHTML = "Make a review";

        // Appending the BUTTON to the DIV
        divForBtn.appendChild(btn);
        divForBtn.appendChild(btnForm);

        div.appendChild(divForBtn);

        // Appending the external DIV to the MAIN DIV
        booksElement.appendChild(div);

        // Creating a new div to hold the element clicked
        let divToggle = document.createElement('DIV');
        divToggle.classList.add('collapse');
        divToggle.classList.add('text-light');
        divToggle.classList.add('separator');

        // Creating a new div to hold the element form
        let divToggleForm = document.createElement('DIV');
        divToggleForm.classList.add('collapse');
        divToggleForm.classList.add('text-light');
        divToggleForm.classList.add('separator');

        // Inserting the necessary id to make it work
        let id = document.createAttribute('id');
        id.value = "openReview";
        divToggle.setAttributeNode(id);

        // Inserting the necessary id to make it work
        let id2 = document.createAttribute('id');
        id2.value = "openForm";
        divToggleForm.setAttributeNode(id2);

        // Retreiving the data inside the new DIVTOGGLE
        let p = document.createElement('P');
        p.innerHTML = data.books[i].title;

        // Created to see the second toggle working
        let formDeclaration = document.createElement('H3');
        formDeclaration.innerHTML = "Make your own review";

        // Now make the elements to receive input and create a new review
        let form = document.createElement('FORM');
        form.classList.add('review-form');
        
        // Create labels
        // let labelName = document.createElement('LABEL');
        // labelName.classList.add('text-light');
        // let forNameLabel = document.createAttribute('for');
        // forNameLabel.value = "name";
        // labelName.setAttributeNode(forNameLabel);

        let labelName = document.createElement('H4');
        labelName.innerHTML = "Your name";

        let labelContent = document.createElement('H4');
        labelContent.innerHTML = "Write review";

        // Create inputs
        // Input for name
        let inputName = document.createElement('INPUT');
        let typeName = document.createAttribute('type');
        typeName.value = "text";
        let nameName = document.createAttribute('name');
        nameName.value = "name";
        let idNameName = document.createAttribute('id');
        idNameName.value = "name";
        inputName.setAttributeNode(typeName);
        inputName.setAttributeNode(nameName);
        inputName.setAttributeNode(idNameName);

        // Input for review
        let inputContent = document.createElement('INPUT');
        let typeContent = document.createAttribute('type');
        typeContent.value = "text";
        let nameContent = document.createAttribute('name');
        nameContent.value = "content";
        let idNameContent = document.createAttribute('id');
        idNameContent.value = "content";
        inputContent.setAttributeNode(typeContent);
        inputContent.setAttributeNode(nameContent);
        inputContent.setAttributeNode(idNameContent);

        // Creat submit button
        let btnSubmit = document.createElement('BUTTON');
        btnSubmit.classList.add('button-primary');
        btnSubmit.innerHTML = "Send Review";

        divToggleForm.appendChild(formDeclaration);

        // Appending to the MAIN DIV
        divToggle.appendChild(p);
        
        // Add label for name on divToggleForm
        divToggleForm.appendChild(labelName);

        // Add input for name on divToggleForm
        divToggleForm.appendChild(inputName);

        // Add label for content on divToggleForm
        divToggleForm.appendChild(labelContent);

        // Add input for content on divToggleForm
        divToggleForm.appendChild(inputContent);

        // Add submit button on divToggleForm
        divToggleForm.appendChild(btnSubmit);

        booksElement.appendChild(divToggle);
        booksElement.appendChild(divToggleForm);

        // Calling function to get the available reviews
        let availableReviews = await requestReview();
        console.log(availableReviews.reviews[0]);

        for (var j = 0; j < availableReviews.reviews.length; j++) {
            // Creating element to add the reviews

            let contentDiv = document.createElement('DIV');
            contentDiv.classList.add('distintc');

            let nameh3 = document.createElement('h3');
            nameh3.innerHTML = availableReviews.reviews[j].name;

            let contentp = document.createElement('P');
            contentp.innerHTML = availableReviews.reviews[j].content;

            if (availableReviews.reviews[j].book === data.books[i].title) {
                contentDiv.appendChild(nameh3);
                contentDiv.appendChild(contentp);
                divToggle.appendChild(contentDiv);
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