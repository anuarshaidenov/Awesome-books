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
    let count = 0;
    this.books.forEach((book) => {
      const markup = `
              <li class="book ${count % 2 === 0 ? 'book--gray' : ''}">
            <h3 class="book-title">"${book.title}" by ${book.author}</h3>
            <button class="btn remove-btn" data-id="${
              book.id
            }" type="button">Remove</button>
          </li>
              `;
      this.booksContainer.insertAdjacentHTML('beforeend', markup);
      count += 1;
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
