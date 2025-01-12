'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import AuthorCard from '../../components/AuthorCard';
import { getAuthors } from '../../api/authorData';
import { useAuth } from '../../utils/context/authContext';

// Component to display all authors
export default function AuthorPage() {
  // Hook to make this page user specific (by grabbing uid of user)
  const { user } = useAuth();

  // States of the author
  const [authors, setAuthors] = useState([]);

  // API call to grab authors from FB and function to update the authors value
  const showAuthors = () => {
    getAuthors(user.uid).then(setAuthors);
  };

  // Hook that will run (showing showAuthors())when the component renders. The hook will update when a dependency appears (none at the moment).
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
          // remainingAuthors={showAuthors} is required because it will perform delete author functionality when the onClick event occurs, then it will remove the card without having to refresh.
          <AuthorCard key={author.firebaseKey} authorObj={author} remainingAuthors={showAuthors} />
        ))}
      </div>
    </>
  );
}
