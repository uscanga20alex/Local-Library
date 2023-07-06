//look up an author by it's id
function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

//match book id to id
function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

//filter out what books are and are not barrowed into two different groups.
function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = books.filter((book) => book.borrows[0].returned === false);
  const returnedBooks = books.filter((book) => book.borrows[0].returned === true);
  return [borrowedBooks, returnedBooks]
}

//create a new array for each book that's borrowed by id.
function getBorrowersForBook(book, accounts) {
  const borrowers = book.borrows.map((borrow) => {
    const account = accounts.find((acc) => acc.id === borrow.id);
    return { ...borrow, ...account};
  });
  return borrowers.slice(0, 10);
}
module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
