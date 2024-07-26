import { Box, Button, Container, Grid, TextField, Typography, styled } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const StyledContainer = styled(Container)({
    width: "50%",
});

export const ButtonBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin:"1rem 0"
});

const SignUp = () => {
    const navigate = useNavigate;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
      });

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirm_password) {
          alert('Passwords do not match');
          return;
        }
    
        try {
          const response = await axios.post('/api/signup', formData);
          console.log(response.data); 
          navigate('/');
        } catch (error) {
          console.error('Error signing up:', error);
        }
      };
  return (
    <div>
        <StyledContainer>
        <Typography variant='h3' fontWeight="bold">Sign Up</Typography>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <Typography className="label">Name</Typography>
            <TextField
            type='text'
              name="name"
            value={formData.name}
            onChange={handleInputChange}
              className="textfield"
              fullWidth
              placeholder="Enter Name ..."
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className="label">Email</Typography>
            <TextField
            type='email'
            name="email"
            value={formData.email}
            onChange={handleInputChange}
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
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter Password"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className="label">Confirm Password</Typography>
            <TextField
            type='password'
              className="textfield"
              fullWidth
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleInputChange}
              placeholder="Confirm Password"
            />
          </Grid>
        <ButtonBox>
          {/* <Link to={{ pathname: `/all` }}> */}
            <Button variant="contained" type="submit">
                Sign Up
            </Button>
            {/* </Link> */}
        </ButtonBox>
        </form>
        <ButtonBox>
            <Typography>Already a User</Typography>
          <Link to={{ pathname: `/` }}>
            <Button variant="contained">
                Log In
            </Button>
            </Link>
        </ButtonBox>
      </StyledContainer>
    </div>
  )
}

export default SignUp