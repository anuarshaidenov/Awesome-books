// eslint-disable-next-line import/no-unresolved
import { DateTime } from 'https://cdn.jsdelivr.net/npm/luxon@2.1.1/build/es6/luxon.min.js';
import mobileMenu from './mobileMenu.js';
import Books from './books.js';
import sectionsEl from './sections.js';

const btnHamburger = document.getElementById('hamburger');
const btnClose = document.getElementById('close');
const mobileLinks = document.querySelectorAll('#menu a');

const sectionBooks = document.getElementById('section-books');
const sectionAdd = document.getElementById('section-add');
const sectionContact = document.getElementById('section-contact');

const booksContainer = document.querySelector('.books-container');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const addBtn = document.getElementById('add-book');

const dateElement = document.getElementById('date');

const bookCollection = new Books(booksContainer);

function updateTime() {
  const now = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
  dateElement.innerText = now;
  setTimeout(updateTime, 1000);
}

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

// Display time and update it
updateTime();

// Control books
bookCollection.init();
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addBook();
});

// Control the mobile menu
mobileMenu.init(btnHamburger, btnClose, mobileLinks);

// Control sections
sectionsEl.init(sectionBooks, sectionAdd, sectionContact);
