/* eslint-disable @next/next/no-img-element */

'use client';

import PropTypes from 'prop-types';
import React from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleAuthor } from '../api/authorData';

export default function AuthorCard({ authorObj, remainingAuthors }) {
  // Function that deletes the author.
  // Uses deleteSingleAuthor API call to grab author with specific firebase key to delete.
  // Then, calls anonymous function, which will update the DOM with the remaining authors (Anonymous function will begin working on src/app/authors/page.js, where it is passed the param of showAuthors(), also found on src/app/authors/page.js).
  const deleteAuthor = () => {
    deleteSingleAuthor(authorObj.firebaseKey).then(() => remainingAuthors());
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img className="authorImage" alt="Author Headshot" variant="top" src={authorObj.image} />
      <Card.Body>
        <Card.Title className="authorName">
          {authorObj.first_name} {authorObj.last_name}
        </Card.Title>
        <Card.Text className="authorEmail">{authorObj.email}</Card.Text>
        <div style={{ marginBottom: '3px' }}>
          {authorObj.favorite && (
            <span>
              <Badge bg="danger">Favorite 🤍</Badge>
              <br />
            </span>
          )}{' '}
          {authorObj.favorite}
        </div>

        {/* Button component from React Bootstrap. Uses href to navigate the user to the edit author form. Uses passHref ensures that the route directing is being applied to the Link's children, in this case it's the button. So the button functions like a navigationn link. Lastly, colored yellow with the variant property. */}
        <Link href={`/author/edit/${authorObj.firebaseKey}`} passHref>
          <Button variant="warning">Edit</Button>
        </Link>
        {/* Button component from React Bootstrap. Colored red with the variant property and runs function to delete the author in onClick property. */}
        <Button variant="danger" onClick={deleteAuthor}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

AuthorCard.propTypes = {
  authorObj: PropTypes.shape({
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.bool,
    image: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
  remainingAuthors: PropTypes.func.isRequired,
};
