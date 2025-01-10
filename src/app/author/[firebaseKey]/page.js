import PropTypes from 'prop-types';
import React from 'react';
import AuthorCard from '@/components/AuthorCard';

export default function ViewAuthor({ params }) {
  const { firebaseKey } = params;

  return (
    <>
      <div>{firebaseKey} is the firebaseKey!</div>
      <div>Here is where we will be able to view an authors details.</div>
      <AuthorCard />
    </>
  );
}

// Will change when params changes
ViewAuthor.propTypes = {
  params: PropTypes.string.isRequired,
};
