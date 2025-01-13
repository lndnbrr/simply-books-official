import React, { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../utils/context/authContext';
import { createAuthor, updateAuthor } from '../../api/authorData';

// Component that creates an Author.
export default function AuthorForm() {
  // Destructured variable that houses useState hook. This tracks the current state of the input.
  const [formInput, setFormInput] = useState([]);

  // Variable that houses useRouter hook. This directs the user to another page when the variable is used.
  const router = useRouter();

  // Variable that houses useAuth hook. This allows the access to the user, making the experience user specific.
  const { user } = useAuth();

  // Function that updates the state of the form as a user interacts with the form. This is an important function that impacts the submission process, calling this function on each form input allows for change to occur (setFormInput) rather than the form input being fixed (formInput).
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function that performs the submitting process for the form. This function uses the API call to create the author, and also passed the payload to add the user's uid into the payload. Then when the author is created, a firebaseKey is assigned as the name for the new author, where the updateAuthor API passes in the patchPayload to make that firebaseKey a key:value in the author object. Lastly, then we use router to redirect the user back to the Authors page.
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, uid: user.uid };
    createAuthor(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateAuthor(patchPayload).then(() => {
        router.push('/authors');
      });
    });
  };

  // Return statement that returns the create an author form.
  return (
    <div>
      {/* Form componenet that houses the form. This part makes the form submit in the manner that was described in handleSubmit() */}
      <Form className="text-black" onSubmit={handleSubmit}>
        {/* Form input for the Author's first name */}
        <FloatingLabel controlId="formInputOne" label="First Name" className="mb-3">
          {/* Form contents that distinguish the content being processed. Similar to a standard form. */}
          <Form.Control
            type="text"
            placeholder="First Name"
            name="first_name"
            // This form content grabs the current state of formInput, specifically the current state of the first_name key and makes the it's value the value of the input. So upon submission, this value will be the representation of this form input.
            value={formInput.first_name}
            // This form content ensures that the current state of formInput for this form input (first name) is updating (using setFormInput) so that formInput isn't at it's initial blank state(useState([]). This onChange event handler is required for each and every form input, since all form inputs have a formInput state.
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* Form input for the Author's last name */}
        <FloatingLabel controlId="formInputTwo" label="Last Name" className="mb-3">
          <Form.Control type="text" placeholder="Last Name" name="last_name" value={formInput.last_name} onChange={handleChange} required />
        </FloatingLabel>

        {/* Form input for the Author's email address */}
        <FloatingLabel controlId="formInputThree" label="Email" className="mb-3">
          <Form.Control type="email" placeholder="abc@email.com" name="email" value={formInput.email} onChange={handleChange} required />
        </FloatingLabel>

        {/* Form input for the Author's image */}
        <FloatingLabel className="mb-3" controlId="formInputFour" label="Author Image">
          <Form.Control type="url" name="image" value={formInput.image} placeholder="Image" onChange={handleChange} required />
        </FloatingLabel>

        {/* Form input for whether the Author is a favorite or not. NOTE: this does not use a floating label, since it's a check box and not a text box for a label to float when selected. */}
        <Form.Check
          type="switch"
          name="favorite"
          className="text-white mb-3"
          label="Are they a favorite of yours?"
          checked={formInput.favorite}
          id="favorite"
          // This onChange event handler does not call handleChange since that function handles changes for typed out responses. This event handler updates the formInput directly by calling setFormInput to pass a function, using the param to open up the previous state of the formInput and add the favorite key with the check status (true or false) as the value.
          onChange={(e) => {
            setFormInput((oldState) => ({ ...oldState, favorite: e.target.checked }));
          }}
        />

        {/* Button for user to submit the form. Since the form is using a event handler, when a submit button is clicked, that event handler will run as described. */}
        <Button type="submit">Press to Create an Author! </Button>
      </Form>
    </div>
  );
}
