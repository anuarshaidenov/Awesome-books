const booksContainer = document.querySelector('.books-container');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const addBtn = document.getElementById('add-book');

function ID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return `_${Math.random().toString(36).substr(2, 9)}`;
}

let books = [
  {
    id: ID(),
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
        <button class="remove-btn" data-id="${book.id}" type="button">Remove</button>
        <hr />
      </div>
          `;
    booksContainer.insertAdjacentHTML('beforeend', markup);
  });
}

function saveData() {
  localStorage.books = JSON.stringify(books);
}

function removeBook(id) {
  books = books.filter((book) => book.id !== id);
  saveData();
  /* eslint-disable */
  loadData();
  /* eslint-enable */
}

function loadData() {
  if (!localStorage.books) {
    return;
  }
  const loadedData = JSON.parse(localStorage.books);
  books = loadedData;
  displayBooks();

  document.querySelectorAll('.remove-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      removeBook(btn.dataset.id);
    });
  });
}

function addBook(title, author) {
  const newBook = {
    id: ID(),
    title,
    author,
  };
  books.push(newBook);
  saveData();
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const title = bookTitle.value;
  const author = bookAuthor.value;
  addBook(title, author);
  loadData();
});

loadData();
