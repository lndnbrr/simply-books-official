import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createAuthor, updateAuthor } from '../../api/authorData';

const intialState = {
  first_name: '',
  last_name: '',
  image: '',
  email: '',
  favorite: false,
};

function AuthorForm({ obj = intialState }) {
  const [formInput, setFormInput] = useState(obj);

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateAuthor(formInput).then(() => {
        router.push('/authors');
      });
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAuthor(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateAuthor(patchPayload).then(() => {
          router.push('/authors');
        });
      });
    }
  };

  return (
    <div>
      <Form className="text-black" onSubmit={handleSubmit}>
        <FloatingLabel controlId="formInputOne" label="First Name" className="mb-3">
          <Form.Control type="text" placeholder="First Name" name="first_name" value={formInput.first_name} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="formInputTwo" label="Last Name" className="mb-3">
          <Form.Control type="text" placeholder="Last Name" name="last_name" value={formInput.last_name} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="formInputThree" label="Email" className="mb-3">
          <Form.Control type="email" placeholder="abc@email.com" name="email" value={formInput.email} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel className="mb-3" controlId="formInputFour" label="Author Image">
          <Form.Control type="url" name="image" value={formInput.image} placeholder="Image" onChange={handleChange} required />
        </FloatingLabel>
        <Form.Check
          type="switch"
          name="favorite"
          className="text-white mb-3"
          label="Are they a favorite of yours?"
          checked={formInput.favorite}
          id="favorite"
          onChange={(e) => {
            setFormInput((oldState) => ({ ...oldState, favorite: e.target.checked }));
          }}
        />
        <Button type="submit">Press to {obj.firebaseKey ? 'update' : 'create'} an Author! </Button>
      </Form>
    </div>
  );
}

AuthorForm.propTypes = {
  obj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    image: PropTypes.string,
    email: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default AuthorForm;
