'use client';

import React from 'react';
import User from '@/components/User';
import { Button } from 'react-bootstrap';
import { signOut } from '@/utils/auth';

export default function Profile() {
  return (
    <>
      <User />
      <Button variant="danger" onClick={signOut}>
        Sign Out
      </Button>
    </>
  );
}
