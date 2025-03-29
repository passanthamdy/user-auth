import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthenticateUserMutation } from '../api/authApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../store/slices/authSlice';
import { IAuthRequest } from '../core/interfaces/authRequest';
import { Alert, Button, Form } from 'react-bootstrap';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<IAuthRequest>({ mode: 'all' });
    const [authenticateUser] = useAuthenticateUserMutation();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit = async (data: IAuthRequest) => {
        try {
            const response = await authenticateUser(data).unwrap();
            console.log("response", response)
            dispatch(setCredentials(response.Data));
            navigate('/me');
            setErrorMessage(null);
        } catch (err: any) {
            setErrorMessage(err.message || 'Failed to log in. Please try again.');
        }
    };

    return (
        <div className="container mt-5 form">
            <h2 className='mb-5 '>Login</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Control className='mb-3'
                        {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' }
                        })}
                        placeholder="Enter your email"
                    />
                    {errors.email && <Alert variant="danger">{errors.email.message}</Alert>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                        placeholder="Enter your password"
                    />
                    {errors.password && <Alert variant="danger">{errors.password.message}</Alert>}
                </Form.Group>

                <Button type="submit" variant="primary" disabled={!isValid}>Login</Button>
            </Form>

            {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
        </div>
    );
};

export default Login;
