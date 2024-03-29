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
  const booksWithAuthor =  books.filter((book) => book.borrows.some(acc => acc.id === account.id && acc.returned === false))
    return mapBooks(booksWithAuthor, authors)

}

function mapBooks(booksWithAuthor, authors) {
 const book = 
  booksWithAuthor.map((book) => { const author = authors.find(author => author.id === book.authorId)
     book.author = author;
     return book;     
  })
  return book;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
