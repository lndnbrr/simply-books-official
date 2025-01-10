/* eslint-disable @next/next/no-img-element */

import PropTypes from 'prop-types';
import React from 'react';
import { useAuth } from '@/utils/context/authContext';

export default function User() {
  const { user } = useAuth();
  return (
    <div>
      <img className="userImage" alt="User Profile Pic" {...user.image} />
      <h1 className="userName">Name: {user.displayName}</h1>
      <h3 className="userEmail">Email: {user.email}</h3>
      <h5 className="lastLogin">Last login: {user.lastlogin}</h5>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    lastlogin: PropTypes.string,
    image: PropTypes.string,
  }),
};

// User.defaultProps = {
//   user: {
//     image: 'https://thumbs.wbm.im/pw/small/6dc1cb1116b972bb2405441d4d590cd2.jpg',
//     name: 'Thomas D.',
//     email: 'tman@gmail.com',
//     lastlogin: '20 min ago',
//   },
// };
