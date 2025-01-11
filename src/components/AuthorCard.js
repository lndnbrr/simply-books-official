/* eslint-disable @next/next/no-img-element */

'use client';

import PropTypes from 'prop-types';
import React from 'react';
import { Badge, Button, Card } from 'react-bootstrap';

export default function AuthorCard({ authorObj }) {
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
        <Button variant="primary">Go somewhere</Button>
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
  }),
};
