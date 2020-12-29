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
    xhttp.open("GET", "get/books", true);
    xhttp.send();
}

function bookRender(data){
    console.log(data.books[0]);

    const h1 = document.createElement('H1');
    h1.classList.add('text-light');
    h1.innerHTML = data.books[0].title;
    booksElement.appendChild(h1);
}