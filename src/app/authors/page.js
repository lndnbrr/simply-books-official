import Link from 'next/link';
import React from 'react';
import { Button } from 'react-bootstrap';

export default function AuthorPage() {
  return (
    <>
      <div>Here is where all of the authors will be displayed!</div>

      <div className="text-center my-4">
        <Link href="/author/new" passHref>
          <Button>Add An Author</Button>
        </Link>
      </div>
    </>
  );
}
