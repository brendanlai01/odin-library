const myLibrary = [];
const bookList = document.querySelector('.book-list');
const bookItem = document.querySelector('.book');
const form = document.querySelector('form');
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
    this.switchCompletion = function(){
        if(this.read === 'Read') return this.read = 'Not Read'
        else return this.read = 'Read';
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    return cloneBook(book.title, book.author, book.pages, book.read);
}

function removeBook(book){
    let index = book.parentElement.parentElement.dataset.index;
    let removedBook = document.querySelector(`[data-index="${index}"]`);
    if (index > -1) {
        myLibrary.splice(index, 1);
    }
    return removedBook.remove();
}

function cloneBook(title, author, pages, read){
    let clonedBook = bookItem.cloneNode(true);
    clonedBook.classList.remove('hidden');
    clonedBook.querySelector('.title').textContent = title;
    clonedBook.querySelector('.author').textContent = author;
    clonedBook.querySelector('.pages').textContent = pages;
    clonedBook.querySelector('.completion').textContent = read;
    if(read === 'Not Read'){
        let button = clonedBook.querySelector('.change-button img');
        button.src = 'icons/close-circle.svg';
    }
    return clonedBook;
}

function displayBooks(){
    let reversedLibrary = myLibrary.slice().reverse();
    let num = reversedLibrary.length - 1;
    reversedLibrary.forEach((book) =>{
        let newBook = cloneBook(book.title, book.author, book.pages, book.read);
        newBook.dataset.index = num;
        num--;
        bookList.prepend(newBook);
    }) //used reversed array to compensate for prepend, wanted books to add behind add button
}

function updateDisplay(){
    let shownBooks = document.querySelectorAll('[data-index]');
    shownBooks.forEach((book) =>{
        book.remove();
    })
}

function changeRead(book){
    let index = book.parentElement.parentElement.dataset.index;
    let currentBook = document.querySelector(`[data-index="${index}"] .completion`);
    let button = document.querySelector(`[data-index="${index}"] .change-button img`);
    if(currentBook.textContent === 'Read'){
        button.src = 'icons/close-circle.svg';
    } else if(currentBook.textContent === 'Not Read'){
        button.src = 'icons/check-circle.svg';
    }
    myLibrary[index].switchCompletion();
    currentBook.textContent = myLibrary[index].read;
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
    updateDisplay();
    displayBooks();
    dialog.close();
    form.reset();
});

addButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});
