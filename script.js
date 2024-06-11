const myLibrary = [];
const bookList = document.querySelector('.book-list');
const bookItem = document.querySelector('.book');
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("#close");
const addBook = document.querySelector('#add-book');
const addButton = document.querySelector('#add-button');

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
    clonedBook.classList.remove('hidden');
    clonedBook.querySelector('.title').textContent = title;
    clonedBook.querySelector('.author').textContent = author;
    clonedBook.querySelector('.pages').textContent = pages;
    clonedBook.querySelector('.completion').textContent = read;
    return clonedBook;
}

function displayBooks(){
    let reversedLibrary = myLibrary.slice().reverse();
    let num = reversedLibrary.length;
    reversedLibrary.forEach((book) =>{
        let newBook = cloneBook(book.title, book.author, book.pages, book.read);
        newBook.dataset.index = num;
        num--;
        bookList.prepend(newBook);
    }) //used reversed array to compensate for prepend, wanted books to add behind add button
}

function readStatus(read){
    return read ? 'Read' : 'Not Read';
}

function createBook(){
    let newTitle = document.querySelector('#title').value;
    let newAuthor = document.querySelector('#author').value;
    let newPages = document.querySelector('#pages').value;
    let newCompletion = document.querySelector('#read').checked;
    let createdBook = new Book(newTitle, newAuthor, newPages, readStatus(newCompletion));
    return addBookToLibrary(createdBook);
}

addBook.addEventListener("click", function(event){
    event.preventDefault();
    createBook();
    displayBooks();
});

addButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});