import Books from './books.js';

const booksContainer = document.querySelector('.books-container');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const addBtn = document.getElementById('add-book');

const bookCollection = new Books(booksContainer);

function clearInputFields() {
  bookTitle.value = '';
  bookAuthor.value = '';
  bookTitle.focus();
}

function addBook() {
  const title = bookTitle.value;
  const author = bookAuthor.value;
  bookCollection.addBook(title, author);
  clearInputFields();
}

bookCollection.init();
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addBook();
});
