import { clientCredentials } from '../utils/client';
// API CALLS FOR BOOKS

const endpoint = clientCredentials.databaseURL;

// GET ALL BOOKS
// API CALL TO GET ALL BOOKS (Transferred from Almost Amazon. Slightly different considering if statement)
const getBooks = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

// DELETE A BOOK
// Same API call in Almost Amazon
const deleteBook = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// GET A SINGLE BOOK
// Same API call in Almost Amazon
const getSingleBook = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// CREATE A BOOK
// Same API call in Almost Amazon
const createBook = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// UPDATE A BOOK
// Same API call in Almost Amazon
const updateBook = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// GET ALL BOOKS BY AN AUTHOR
// Did not have this API call in my Almost Amazon
const getBooksByAuthor = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json?orderBy="author_id"&equalTo="${firebaseKey}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// GET ALL BOOKS ON SALE
// Same API call in Almost Amazon
const booksOnSale = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const onSale = Object.values(data).filter((item) => item.sale);
        resolve(onSale);
      })
      .catch(reject);
  });

// API CALL TO SEARCH FOR BOOKS (Transferred from Almost Amazon. This was a stretch goal)
// const searchBook = (uid, keyword) => new Promise((resolve, reject) => {
//   fetch(`${endpoint}/books.json?orderBy="uid"&equalTo="${uid}"`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const searched = Object.values(data).filter((item) => item.title.toLowerCase().includes(keyword.toLowerCase()));
//       resolve(searched);
//     })
//     .catch(reject);
// });

export { getBooks, createBook, booksOnSale, deleteBook, getSingleBook, updateBook, getBooksByAuthor };
