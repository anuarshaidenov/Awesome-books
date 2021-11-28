// eslint-disable-next-line import/no-unresolved
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

class Book {
  constructor(title, author) {
    this.id = uuidv4();
    this.title = title;
    this.author = author;
  }
}

export default Book;
