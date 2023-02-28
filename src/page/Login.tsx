import React, { useState } from 'react'
import { Button, Container, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { checkUserCredential } from '../utils/checkUser'

type Props = {}

const Login = (props: Props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    /**
   * 
   * @function handleLogin
   * @return void
   * @param event
   * @description To store loginUser and Other stuff..
    */
    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (checkUserCredential(email, password)) {
            navigate('/')
            localStorage.setItem('loginUser', email)
            localStorage.setItem('isLoggedIn', 'true')
        } else {
            setError('Please Check Your Details')
        }
    }
    return (
        <Container className='main-div d-flex align-items-center justify-content-center'>
            <div className='w-75 h-75 bg-light'>
                <div className='p-3 h-100 d-flex align-items-center justify-content-center'>
                    <div className="h-75 w-75 border p-3">
                        <h3 className='text-center'>Login</h3>
                        <div className='p-5'>
                            <Form onSubmit={(e) => handleLogin(e)}>
                                <FormGroup className='my-3'>
                                    <FormLabel>User Name: </FormLabel>
                                    <FormControl onChange={(event) => setEmail(event.target.value)} value={email} />
                                </FormGroup>
                                <FormGroup className='my-3'>
                                    <FormLabel>Password: </FormLabel>
                                    <FormControl type='password' onChange={(event) => setPassword(event.target.value)} value={password} />
                                </FormGroup>
                                <Button type='submit'>Login</Button>
                            </Form>
                            {
                                error ? <h6 className='mt-3'>{error}</h6> : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Login
