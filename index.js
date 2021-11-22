const booksContainer = document.querySelector('.books-container');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const addBtn = document.getElementById('add-book');

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
        <button id="removeBtn" type="button">Remove</button>
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
    id: ID(),
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

function ID () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

let bookId = ID();
const removeButton = document.querySelector('#removeBtn');
removeButton.addEventListener('click', (bookId) => {
  console.log('clicked');
  const newAddedBooks = books.filter(books.id !== bookId);
  localStorage.setItem('books', JSON.stringify(newAddedBooks));
});
