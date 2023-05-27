function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((count, book) => {
    const borrows = book.borrows;
    const borrowedCount = borrows.filter ((borrow) => borrow.returned === false).length;
    return count + borrowedCount;
  }, 0);
}

function getMostCommonGenres(books) {
  let genres = {};
  let count = 0;
  books.forEach((book) => {
    const {genre, borrows} = book;
    if (genres[genre]){
      genres[genre]++;
    }else {
      genres[genre] = 1;
    }
  });
  const sortedGengres = Object.entries(genres)
  .sort(([, countA], [, countB]) => countB - countA)  
  .map(([genre]) => { return {name: genre, count: genres[genre]} })
  return sortedGengres.slice(0, 5);
}

function getMostPopularBooks(books) {
  let popular = [];
  let maxBorrows = 0;
  for (const book of books) {
    const {borrows} = book;
    const borrowCount = borrows.length;
    
    if (borrowCount > maxBorrows){
      maxBorrows = borrowCount;
      popular = [book];
    }else if (borrowCount === maxBorrows){
      popular.push(book);
    }
  }
  const popularBooks = books.map((book) =>{
    return {
      name: book.title,
      count: book.borrows.length
    };
  });
  const sortedPopularBooks = popularBooks.sort((a, b) => b.count - a.count);
  return sortedPopularBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let authorCounts = {};
  books.forEach((book) => {
    const {authorId, borrows} = book;
    if (!authorCounts[authorId]){
      authorCounts[authorId] = 0;
    }
    authorCounts[authorId] += borrows.length
  });
  const sortedAuthors= Object.entries(authorCounts)
  .sort(([authorIdA, countA], [authourIdB, countB]) => countB - countA);
  const topAuthors = sortedAuthors.slice(0, 5);
  const result = topAuthors.map(([authorId, count]) => {
    const author = authors.find((author) => author.id === Number(authorId));
    return{
      name: `${author.name.first} ${author.name.last}`,
      count: count
    };
  });
  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
