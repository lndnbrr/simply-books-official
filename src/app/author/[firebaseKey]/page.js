'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import BookCard from '@/components/BookCard';
import { Badge } from 'react-bootstrap';
import { viewAuthorDetails } from '../../../api/mergedData';
import { getBooksByAuthor } from '../../../api/bookData';

export default function ViewAuthor({ params }) {
  const { firebaseKey } = params;

  const [authorView, setAuthorView] = useState({});

  const [authorBooks, setAuthorBooks] = useState([]);

  // const getAllAuthorBooks = () => {
  //   getSingleAuthor(firebaseKey).then(getAuthorBooks(firebaseKey)).then(setAuthorBooks)
  // }

  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorView).then(getBooksByAuthor(firebaseKey).then(setAuthorBooks));
  }, [firebaseKey]);

  return (
    <>
      <h1>
        This is {authorView.first_name} {authorView.last_name}!
      </h1>
      <img src={authorView.image} alt={authorView.first_name} style={{ width: '400px' }} />
      <h3>Email: {authorView.email}</h3>
      <Badge bg="danger">{authorView.favorite ? 'Favorite 🤍' : ''}</Badge>
      <hr />
      <h1>
        All books by {authorView.first_name} {authorView.last_name}!
      </h1>
      <div>
        {authorBooks.map((book) => (
          <BookCard key={book.firebaseKey} bookObj={book} />
        ))}
      </div>
    </>
  );
}

// Will change when params changes
ViewAuthor.propTypes = {
  params: PropTypes.string.isRequired,
};
