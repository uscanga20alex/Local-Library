function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
 }
 
 function sortAccountsByLastName(accounts) {
   return accounts.sort((a, b) => a.name.last > b.name.last ? 1 : -1);
 }
 
 function getTotalNumberOfBorrows(account, books) {
   const accountId = account.id;
   let totalBorrows = 0;
   books.forEach((book) => {
     const borrows = book.borrows;
     const borrowCount = borrows.filter((borrow) => borrow.id === accountId).length;
     totalBorrows += borrowCount;
   });
   return totalBorrows;
 };
 
 function getBooksPossessedByAccount(account, books, authors) {
   const accountId = account.id;
   const checkedOutBooks = books.filter((book) => {
     const recentBorrow = book.borrows[0];
     return recentBorrow.id === accountId && !recentBorrow.returned;
   });
   const booksWithAuthor = checkedOutBooks.map((book) => {
     const author = authors.find((author) => author.id === book.authorId);
     return {...book, author};
   });
   return booksWithAuthor;
 }
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
