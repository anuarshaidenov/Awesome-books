import Book from './book.js';

class Books {
  constructor(booksContainer) {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.booksContainer = booksContainer;
  }

  #saveData() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  #displayBooks() {
    this.booksContainer.innerHTML = '';
    this.books.forEach((book) => {
      const markup = `
              <div class="book">
            <h3 class="title">${book.title}</h3>
            <h3 class="author">${book.author}</h3>
            <button class="remove-btn" data-id="${book.id}" type="button">Remove</button>
            <hr />
          </div>
              `;
      this.booksContainer.insertAdjacentHTML('beforeend', markup);
      document.querySelectorAll('.remove-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const bookID = btn.dataset.id;
          this.removeBook(bookID);
        });
      });
    });
  }

  addBook(title, author) {
    const newBook = new Book(title, author);
    this.books.push(newBook);
    this.#saveData();
    this.#displayBooks();
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
    this.#saveData();
    this.#displayBooks();
  }

  init() {
    this.#displayBooks();
  }
}

export default Books;
