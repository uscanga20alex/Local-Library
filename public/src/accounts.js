//looking for id w/i account
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
 }

//sorting a-z lastnames
 function sortAccountsByLastName(accounts) {
   return accounts.sort((a, b) => a.name.last > b.name.last ? 1 : -1);
 }

//use account and books to filter out how many books are borrowed and get a count.
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
 
//filter what books are in possession of different account id and create a new array with id and author 
function getBooksPossessedByAccount(account, books, authors) {
   const accountId = account.id;
   const checkedOutBooks = books.filter((book) => {
     const recentBorrow = book.borrows[0];
     return recentBorrow.id === accountId && !recentBorrow.returned;
   });
   const booksWithAuthor = mapBooks(checkedOutBooks);
   return booksWithAuthor;
 }

 function mapBooks(checkedOutBooks) {
  const out = checkedOutBooks.map((book) => { //returns array, need return at beginning
    const author= authors.find((author) => author.id === book.authorId);
    return {...book, author};
  })
  return out;
 }

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};