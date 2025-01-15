'use client';

import React, { useEffect, useState } from 'react';
import { getSingleBook } from '@/api/bookData';
import BookForm from '@/components/forms/BookForm';
import PropTypes from 'prop-types';

export default function EditBook({ params }) {
  const [editItem, setEditItem] = useState({});
  const { firebaseKey } = params;

  useEffect(() => {
    getSingleBook(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return <BookForm obj={editItem} />;
}

EditBook.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
