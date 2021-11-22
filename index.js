const booksContainer = document.querySelector('.books-container');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const addBtn = document.getElementById('add-book');

let books = [
  {
    title: 'test 1',
    author: 'test',
  },
];

function displayBooks() {
  booksContainer.innerHTML = '';
  books.forEach((book) => {
    const markup = `
          <div class="book">
        <h3 class="title">${book.title}</h3>
        <h3 class="author">${book.author}</h3>
        <button type="button">Remove</button>
        <hr />
      </div>
          `;
    booksContainer.insertAdjacentHTML('beforeend', markup);
  });
}

function loadData() {
  if (!localStorage.books) {
    return;
  }
  const loadedData = JSON.parse(localStorage.books);
  books = loadedData;
  displayBooks();
}

function saveData() {
  localStorage.books = JSON.stringify(books);
}

function addBook(title, author) {
  const newBook = {
    title: title,
    author: author,
  };
  books.push(newBook);
  saveData();
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const title = bookTitle.value;
  const author = bookAuthor.value;
  addBook(title, author);
  displayBooks();
});

loadData();
