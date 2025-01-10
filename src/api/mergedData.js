import { getAuthorBooks, getSingleAuthor, deleteSingleAuthor } from './authorData';
import { getSingleBook, deleteBook } from './bookData';

// Old Almost Amazon API CALL (book details)
// const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
//   getSingleBook(firebaseKey).then((bookObj) => {
//     getSingleAuthor(bookObj.author_id)
//       .then((authorObj) => resolve({ ...bookObj, authorObj }));
//   }).catch(reject);
// });

// New Simply Books API call (book details)
const viewBookDetails = (bookFirebaseKey) =>
  new Promise((resolve, reject) => {
    getSingleBook(bookFirebaseKey)
      .then((bookObject) => {
        getSingleAuthor(bookObject.author_id).then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
      })
      .catch((error) => reject(error));
  });

// Old Almost Amazon API CALL (author details)
// const getAuthorDetails = (firebaseKey) => new Promise((resolve, reject) => {
//   getSingleAuthor(firebaseKey).then((authorObj) => {
//     getAuthorBooks(authorObj.firebaseKey)
//       .then((bookObj) => resolve({ ...authorObj, bookObj }));
//   }).catch(reject);
// });

// New Simply Books API call (author details)
const viewAuthorDetails = (authorFirebaseKey) =>
  new Promise((resolve, reject) => {
    Promise.all([getSingleAuthor(authorFirebaseKey), getAuthorBooks(authorFirebaseKey)])
      .then(([authorObject, authorBooksArray]) => {
        resolve({ ...authorObject, books: authorBooksArray });
      })
      .catch((error) => reject(error));
  });

// Old Almost Amazon API CALL (delete author books relationship)
// const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
//   getAuthorBooks(firebaseKey).then((authorBooksArray) => {
//     const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));

//     Promise.all(deleteBookPromises).then(() => {
//       deleteSingleAuthor(firebaseKey).then(resolve);
//     });
//   }).catch(reject);
// });

// New Simply Books API call (delete author books relationship)
const deleteAuthorBooks = (authorId) =>
  new Promise((resolve, reject) => {
    getAuthorBooks(authorId)
      .then((booksArray) => {
        console.warn(booksArray, 'Author Books');
        const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));

        Promise.all(deleteBookPromises).then(() => {
          deleteSingleAuthor(authorId).then(resolve);
        });
      })
      .catch((error) => reject(error));
  });

export { viewBookDetails, viewAuthorDetails, deleteAuthorBooks };
