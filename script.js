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
    return cloneBook(book.title, book.author, book.pages, book.read);
}

function cloneBook(title, author, pages, read){
    let clonedBook = bookItem.cloneNode(true);
    clonedBook.querySelector('#title').textContent = title;
    clonedBook.querySelector('#author').textContent = author;
    clonedBook.querySelector('#pages').textContent = pages;
    clonedBook.querySelector('#completion').textContent = read;
    return bookList.appendChild(clonedBook);
}