import Book from './book.js';

class Books {
  constructor(booksContainer) {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.booksContainer = booksContainer;
  }

  #saveData() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  #displayEmpty(message) {
    this.booksContainer.style.padding = '2rem';
    this.booksContainer.innerHTML = `<h3 class="message">${message} <a href="#add" class="btn">add a new book</a></h3> `;
  }

  static #displayAdd() {
    const message = document.getElementById('contact-message');
    message.classList.remove('message-hidden');
    setTimeout(() => message.classList.add('message-hidden'), 5000);
  }

  #removeMessage() {
    this.booksContainer.style.padding = '0';
    this.booksContainer.innerHTML = '';
  }

  #displayBooks() {
    if (this.books.length <= 0) {
      this.#displayEmpty('Your list is empty...');
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
    Books.#displayAdd();
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
