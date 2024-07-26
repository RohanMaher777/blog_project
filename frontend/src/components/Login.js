import { Box, Button, Container, Grid, TextField, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const StyledContainer = styled(Container)({
    width: "50%",
});

export const ButtonBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin:"1rem 0"
});

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        const DEFAULT_EMAIL = "xyz@gmail.com"
        const DEFAULT_PASSWORD = "xyz@123"
    
        if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
            navigate('/all')
        } else {
        try {
          const response = await axios.post('/api/login', {
            email,
            password
          })
          if (response.status === 200) {
            navigate('/all')
          }
        } catch (err) {
          setError('Login failed. Please check your credentials.')
        }
    }
      }
  return (
    <div>
        <StyledContainer>
        <Typography variant='h3' fontWeight="bold">Log In</Typography>
        <form onSubmit={handleLogin}>
          <Grid item xs={12}>
            <Typography className="label">Email</Typography>
            <TextField
            type='email'
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="textfield"
              fullWidth
              placeholder="Enter email ..."
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className="label">Password</Typography>
            <TextField
            type='password'
              className="textfield"
              fullWidth
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </Grid>
        <ButtonBox>
            <Button variant="contained" type='submit'>
                Log In
            </Button>
        </ButtonBox>
        </form>
          {error && <Typography color="error">{error}</Typography>}
        <ButtonBox>
            <Typography>New User</Typography>
          <Link to={{ pathname: `/signup` }}>
            <Button variant="contained">
                Sign Up
            </Button>
            </Link>
        </ButtonBox>
      </StyledContainer>
    </div>
  )
}

export default Login