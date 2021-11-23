/* eslint-disable max-classes-per-file */

const booksContainer = document.querySelector('.books-container');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const addBtn = document.getElementById('add-book');

class Book {
  constructor(title, author) {
    this.id = Book.ID();
    this.title = title;
    this.author = author;
  }

  static ID() {
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

  static clearInputFields() {
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
    Books.clearInputFields();
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
