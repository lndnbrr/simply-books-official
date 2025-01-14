'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import AuthorForm from '@/components/forms/AuthorForm';
import { getSingleAuthor } from '@/api/authorData';

export default function EditAuthor({ params }) {
  // Destructured variable that houses the state of the author in edit mode. The useState passes an empty object, meaning that it's expecting an object.
  const [editAuthor, setEditAuthor] = useState({});

  // This is a way to use firebaseKey as is, rather than call params.firebaseKey all the time.
  // const { firebaseKey } = params;

  // React hook that houses an API call with a .then() statement, and a dependency array. The API call retrieves an author and determines that author with the firebaseKey in it's parameter, then the code will update the author in edit mode with the author with the selected firebaseKey. This API call with the .then() statement will run again when the params.firebaseKey is changing.
  useEffect(() => {
    getSingleAuthor(params.firebaseKey).then(setEditAuthor);
  }, [params.firebaseKey]);

  return (
    <>
      <div>Edit Author Here</div>

      {/* Component that inncorporates the form to edit an author. The prop obj passes editAuthor, the current state of the author in edit mode */}
      <AuthorForm obj={editAuthor} />
    </>
  );
}

// Prop declaration for the prop params. Although it doesn't say what key:value items are inside of it, this declaration makes sure that the prop is declared as an object,
EditAuthor.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
