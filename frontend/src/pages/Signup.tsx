import { useForm } from 'react-hook-form';
import { useSingupMutation } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ISignupRequest } from '../core/interfaces/signupRequest';
import { Alert, Button, Form } from 'react-bootstrap';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ISignupRequest>({ mode: 'all' });
  const [signup] = useSingupMutation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: ISignupRequest) => {
    try {
       await signup(data).unwrap();
      navigate('/login');
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to signup. Please try again.');

    }
  };

  return (
    <div className="container mt-5 form">
      <h2>Sign Up</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            {...register('name', { required: 'Name is required' })}
            placeholder="Enter your name"
          />
          {errors.name && <Alert variant="danger">{errors.name.message}</Alert>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' }
            })}
            placeholder="Enter your email"
          />
          {errors.email && <Alert variant="danger">{errors.email.message}</Alert>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/,
                message: 'Password must be at least 8 characters long, include a letter, a number, and a special character'
              }
            })}
            placeholder="Enter your password"
          />
          {errors.password && <Alert variant="danger">{errors.password.message}</Alert>}
        </Form.Group>

        <Button type="submit" variant="primary" disabled={!isValid}>Sign Up</Button>
      </Form>

      {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
    </div>
  );
};

export default SignUp;
