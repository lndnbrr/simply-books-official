'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import AuthorForm from '@/components/forms/AuthorForm';
import { getSingleAuthor } from '@/api/authorData';

export default function EditAuthor({ params }) {
  const [editAuthor, setEditAuthor] = useState({});

  useEffect(() => {
    getSingleAuthor(params.firebaseKey).then(setEditAuthor);
  }, [params.firebaseKey]);

  return (
    <>
      <div>Edit Author Here</div>
      <AuthorForm obj={editAuthor} />
    </>
  );
}

EditAuthor.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
