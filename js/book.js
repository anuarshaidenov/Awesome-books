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

export default Book;
