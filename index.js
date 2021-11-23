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
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return `_${Math.random().toString(36).substr(2, 9)}`;
  }
}

class Books {
  constructor() {
    this.books = [];
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
    this.displayBooks();
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
    this.displayBooks();
  }
}

const bookCollection = new Books();

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const title = bookTitle.value;
  const author = bookAuthor.value;
  bookCollection.addBook(title, author);
});

// function ID() {
//   // Math.random should be unique because of its seeding algorithm.
//   // Convert it to base 36 (numbers + letters), and grab the first 9 characters
//   // after the decimal.
//   return `_${Math.random().toString(36).substr(2, 9)}`;
// }

// let books = [
//   {
//     id: ID(),
//     title: 'test 1',
//     author: 'test',
//   },
// ];

// function displayBooks() {
//   booksContainer.innerHTML = '';
//   books.forEach((book) => {
//     const markup = `
//           <div class="book">
//         <h3 class="title">${book.title}</h3>
//         <h3 class="author">${book.author}</h3>
//         <button class="remove-btn" data-id="${book.id}" type="button">Remove</button>
//         <hr />
//       </div>
//           `;
//     booksContainer.insertAdjacentHTML('beforeend', markup);

//     document.querySelectorAll('.remove-btn').forEach((btn) => {
//       btn.addEventListener('click', () => {
//         removeBook(btn.dataset.id);
//       });
//     });
//   });
// }

// function saveData() {
//   localStorage.books = JSON.stringify(books);
// }

// function removeBook(id) {
//   books = books.filter((book) => book.id !== id);
//   saveData();
//   /* eslint-disable */
//   loadData();
//   /* eslint-enable */
// }

// function loadData() {
//   if (!localStorage.books) {
//     displayBooks();
//     return;
//   }
//   const loadedData = JSON.parse(localStorage.books);
//   books = loadedData;
//   displayBooks();
// }

// function addBook(title, author) {
//   const newBook = {
//     id: ID(),
//     title,
//     author,
//   };
//   books.push(newBook);
//   saveData();
// }

// addBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   const title = bookTitle.value;
//   const author = bookAuthor.value;
//   addBook(title, author);
//   loadData();
// });

// loadData();
