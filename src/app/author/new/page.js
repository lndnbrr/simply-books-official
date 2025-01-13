'use client';

import React from 'react';
import AuthorForm from '../../../components/forms/AuthorForm';

export default function AddAuthor() {
  return (
    <>
      <div>Add Author Here</div>

      {/* Component that adds the form to create an author. */}
      <AuthorForm />
    </>
  );
}
