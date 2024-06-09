const myLibrary = [];
const bookList = document.querySelector('.book-list');
const bookItem = document.querySelector('.book');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, it is ${this.pages} pages long, ${this.read}`;
    };
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}
