import Book from './book.js';

class Books {
  constructor(booksContainer) {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.booksContainer = booksContainer;
  }

  #saveData() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  #displayMessage(message) {
    this.booksContainer.style.padding = '1rem';
    this.booksContainer.innerHTML = `<h3 class="message">${message}</h3>`;
  }

  #removeMessage() {
    this.booksContainer.style.padding = '0';
    this.booksContainer.innerHTML = '';
  }

  #displayBooks() {
    if (this.books.length <= 0) {
      this.#displayMessage('Your list is empty');
    } else {
      this.#removeMessage();
    }
    let count = 0;
    this.books.forEach((book) => {
      const markup = `
              <li class="book ${count % 2 === 0 ? 'book--grey' : ''}">
              <h3 class="book__info">"${book.title}" by ${book.author}</h3>
            <button class="btn btn-remove" data-id="${
  book.id
}" type="button">Remove</button>
          </li>
              `;
      this.booksContainer.insertAdjacentHTML('beforeend', markup);
      document.querySelectorAll('.btn-remove').forEach((btn) => {
        btn.addEventListener('click', () => {
          const bookID = btn.dataset.id;
          this.removeBook(bookID);
        });
      });
      count += 1;
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
