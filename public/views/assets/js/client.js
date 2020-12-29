console.log('client javascript running');

const booksElement = document.getElementById('books');
const xhttp = new XMLHttpRequest();

(function(){
    requestBooks();
}());

function requestBooks(){
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            bookRender(data);
        }
    };
    xhttp.open("GET", "/get/books", true);
    xhttp.send();
}

function bookRender(data){
    console.log(data.books[0]);

    // const h1 = document.createElement('H1');
    // h1.classList.add('text-light');
    // h1.innerHTML = data.books[0].title;
    // booksElement.appendChild(h1);

    for (var i = 0; i < data.books.length; i++) {

        let div = document.createElement('DIV');
        div.classList.add('separator');
        let h1 = document.createElement('H1');
        h1.classList.add('text-light');
        h1.classList.add('text-uppercase');
        // h1.classList.add('bg-dark');
        h1.innerHTML = data.books[i].title;
        div.appendChild(h1);
        
        // booksElement.appendChild(h1);

        let h3 = document.createElement('H3');
        h3.classList.add('text-light');
        h3.textContent = data.books[i].author;
        div.appendChild(h3);
        // booksElement.appendChild(h3);
        booksElement.appendChild(div);
    }
    
}