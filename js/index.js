import { DateTime } from '../node_modules/luxon/build/es6/luxon.js';
import Books from './books.js';

const booksContainer = document.querySelector('.books-container');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const addBtn = document.getElementById('add-book');
const bookCollection = new Books(booksContainer);

const now = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
console.log(now);

function clearInputFields() {
  bookTitle.value = '';
  bookAuthor.value = '';
  bookTitle.focus();
};

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
