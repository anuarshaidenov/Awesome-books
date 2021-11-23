/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */

const booksContainer = document.querySelector('.books-container');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const addBtn = document.getElementById('add-book');

class Book {
  constructor(title, author) {
    this.id = this.ID();
    this.title = title;
    this.author = author;
  }

  ID() {
    return `_${Math.random().toString(36).substr(2, 9)}`;
  }
}

class Books {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  saveData() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  clearInputFields() {
    bookTitle.value = '';
    bookAuthor.value = '';
  }

  displayBooks() {
    booksContainer.innerHTML = '';
    this.books.forEach((book) => {
      const markup = `
            <div class="book">
          <h3 class="title">${book.title}</h3>
          <h3 class="author">${book.author}</h3>
          <button class="remove-btn" data-id="${book.id}" type="button">Remove</button>
          <hr />
        </div>
            `;
      booksContainer.insertAdjacentHTML('beforeend', markup);
      document.querySelectorAll('.remove-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          this.removeBook(btn.dataset.id);
        });
      });
    });
  }

  addBook(title, author) {
    const newBook = new Book(title, author);
    this.books.push(newBook);
    this.saveData();
    this.displayBooks();
    this.clearInputFields();
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
    this.saveData();
    this.displayBooks();
  }
}

const bookCollection = new Books();
bookCollection.displayBooks();
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const title = bookTitle.value;
  const author = bookAuthor.value;
  bookCollection.addBook(title, author);
});
