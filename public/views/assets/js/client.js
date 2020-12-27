console.log('client javascript running');

const booksElement = document.querySelector('.books');
const API_BOOKS_URL = 'https://5000-d3f322ab-7404-43e7-aab7-5032e8f9499b.ws-eu03.gitpod.io/books';

listBooks();

function listBooks() {
    booksElement.innerHTML = '';
    fetch(API_BOOKS_URL)
        .then(response => response.json())
        .then(books => {
            console.log(books);
            console.log('running until here');

            for (let i = 0; i < books.length; i++){
                console.log(books[i]);
                const div = document.createElement('div');

                const header = document.createElement('h3');
                header.textContent = books[i].title;

                const contents = document.createElement('p');
                contents.textContent = books[i].author;

                div.appendChild(header);
                div.appendChild(contents);

                booksElement.appendChild(div);
            }

            
            // books.forEach(book => {
            //     const div = document.createElement('div');
            //     const header = document.createElement('h3');
            //     header.textContent = book.title;

            //     const contents = document.createElement('p');
            //     contents.textContent = book.author;

            //     div.appendChild(header);
            //     div.appendChild(contents);

            //     booksElement.appendChild(div);
            // });

            // return books.map(function(book) {
            //     const div = document.createElement('div');
            //     const header = document.createElement('h3');
            //     header.textContent = book.title;

            //     const contents = document.createElement('p');
            //     contents.textContent = book.author;

            //     div.appendChild(header);
            //     div.appendChild(contents);

            //     booksElement.appendChild(div);
            // })

        });

}