/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getBooks } from '../api/bookData';
import { useAuth } from '../utils/context/authContext';
import BookCard from '../components/BookCard';

function Home() {
  const [books, setBooks] = useState([]);
  const { user } = useAuth();

  const getAllTheBooks = () => {
    getBooks(user.uid).then(setBooks);
  };

  useEffect(() => {
    getAllTheBooks();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/book/new" passHref>
        <Button>Add A Book</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {books.map((book) => (
          <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAllTheBooks} />
        ))}
      </div>
    </div>
  );
}

export default Home;
