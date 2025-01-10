import { clientCredentials } from '../utils/client';
// API CALLS FOR AUTHORS

const endpoint = clientCredentials.databaseURL;

// GET ALL AUTHORS
// Same API call in Almost Amazon
const getAuthors = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors.json?orderBy="uid"&equalTo="${uid}"`, {
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

// CREATE AN AUTHOR
// API CALL TO CREATE AUTHOR (Transferred from Almost Amazon)
const createAuthor = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors.json`, {
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

// GET A SINGLE AUTHOR
// Same API call in Almost Amazon
const getSingleAuthor = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// DELETE AN AUTHOR
// Same API call in Almost Amazon
const deleteSingleAuthor = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// UPDATE AN AUTHOR
// API CALL TO UPDATE AUTHOR (Transferred from Almost Amazon)
const updateAuthor = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors/${payload.firebaseKey}.json`, {
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

// GET A SINGLE AUTHOR'S BOOKS
// API CALL TO GET A SINGLE AUTHOR'S BOOKS (Transferred from Almost Amazon)
const getAuthorBooks = (firebaseKey) =>
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

// GET ALL AUTHORS WITH FAVORITE STATUS
// Same API call in Almost Amazon
const favoriteAuthors = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const favorites = Object.values(data).filter((item) => item.favorite);
        resolve(favorites);
      })
      .catch(reject);
  });

export { getAuthors, createAuthor, getSingleAuthor, deleteSingleAuthor, updateAuthor, favoriteAuthors, getAuthorBooks };
