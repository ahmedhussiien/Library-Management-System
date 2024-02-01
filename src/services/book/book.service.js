class BookService {
  constructor(db) {
    this.db = db;
    this.Book = db.Book;
  }

  async findAll() {
    return Book.findAll();
  }

  async findOne(id) {
    return this.Book.findOne({ where: { id } });
  }

  async createOne(data) {
    return this.Book.create(data);
  }
}

export default BookService;
