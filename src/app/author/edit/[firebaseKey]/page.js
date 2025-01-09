import PropTypes from 'prop-types';
import React from 'react';

export default function EditAuthor({ params }) {
  const { firebaseKey } = params;

  return (
    <>
      <div>{firebaseKey} is the firebaseKey!</div>
      <div>Here is where we will be able to edit/update an author.</div>
    </>
  );
}

// Will change when params changes
EditAuthor.propTypes = {
  params: PropTypes.string.isRequired,
};
