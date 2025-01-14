'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import BookCard from '@/components/BookCard';
import { Badge } from 'react-bootstrap';
// import { viewAuthorDetails } from '../../../api/mergedData';
import { getBooksByAuthor } from '../../../api/bookData';
import { getSingleAuthor } from '../../../api/authorData';

export default function ViewAuthor({ params }) {
  const { firebaseKey } = params;

  // state of the viewing author details
  const [authorView, setAuthorView] = useState({});

  // state of the books by a specific author
  const [authorBooks, setAuthorBooks] = useState([]);

  // hook that uses API call to get an author w/ specific fb key and sets it to be the current state of viewing author details, then uses API call to get books made by an author w/ specific fb key and sets it to be the current state of books by a specific author
  useEffect(() => {
    getSingleAuthor(firebaseKey).then(setAuthorView).then(getBooksByAuthor(firebaseKey).then(setAuthorBooks));
  }, [firebaseKey]);

  return (
    <>
      {/* This is the author's details */}
      <h1>
        This is {authorView.first_name} {authorView.last_name}!
      </h1>
      <img src={authorView.image} alt={authorView.first_name} style={{ width: '400px' }} />
      <h3>Email: {authorView.email}</h3>
      <Badge bg="danger">{authorView.favorite ? 'Favorite 🤍' : ''}</Badge>
      <hr />
      {/* This is the books that the author made */}
      <h1>
        All books by {authorView.first_name} {authorView.last_name}!
      </h1>
      <div>
        {/* NOTE: parentheses after arrow functioon, NOT CURLY BRACES */}
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
