'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import AuthorCard from '../../components/AuthorCard';
import { getAuthors } from '../../api/authorData';
import { useAuth } from '../../utils/context/authContext';

export default function AuthorPage() {
  const { user } = useAuth();
  const [authors, setAuthors] = useState([]);

  const showAuthors = () => {
    getAuthors(user.uid).then(setAuthors);
  };

  useEffect(() => {
    showAuthors();
  }, []);

  return (
    <>
      <div style={{ fontSize: '5rem' }}>Authors Page</div>
      <div className="text-center my-4">
        <Link href="/author/new" passHref>
          <Button>Add An Author</Button>
        </Link>
      </div>

      <div className="d-flex flex-wrap">
        {authors.map((author) => (
          <AuthorCard key={author.firebaseKey} authorObj={author} remainingAuthors={showAuthors} />
        ))}
      </div>
    </>
  );
}
