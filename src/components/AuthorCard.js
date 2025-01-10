/* eslint-disable @next/next/no-img-element */

import PropTypes from 'prop-types';
import React from 'react';

export default function AuthorCard({ authorObj }) {
  return (
    <div>
      <img className="authorImage" alt="Author Headshot" {...authorObj.image} />
      <h1 className="authorName">
        {authorObj.firstName} {authorObj.lastName}
      </h1>
      <h3 className="authorEmail">{authorObj.email}</h3>
    </div>
  );
}

AuthorCard.propTypes = {
  authorObj: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.bool,
    image: PropTypes.string,
    favorite: PropTypes.bool,
  }),
};

AuthorCard.defaultProps = {
  authorObj: {
    email: 'br@gmail.com',
    first_name: 'Brandon',
    last_name: 'Gains',
    image: 'https://c8.alamy.com/comp/MR0G79/random-pictures-MR0G79.jpg',
    favorite: true,
  },
};
