import React from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
// import axios from 'axios';
// import CardMedia from '@mui/material/CardMedia';
import { useState, useEffect } from 'react';
import { ICONS } from '../../Assets/Icons';
import useMediaQuery from '@mui/material/useMediaQuery';
import { paper2Style, avatar2Style, Text2FieldStyle, btn2style } from '../../consts/constants';
import { api } from '../../Api';

export default function SignUp() {
  const [data, setData] = useState({});


  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {

    if (data === '') {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
  };
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h3 style={{ color: '#00ff00' }}>User successfully registered!!</h3>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h3 style={{ color: 'red' }}>Please enter all the fields</h3>
      </div>
    );
  };


  const Ipad = useMediaQuery('(min-width:1000px)');

  const Register = async () => {
    const Data = await api.auth.register(data)
    console.log(Data)
    
  }


  useEffect(() => { console.log(data) }, [data])

  return (
    <Grid sx={{ display: 'flex', flexDirection: Ipad ? 'row' : 'column' }}>
      <div>
        <img src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-125.jpg"
          height={Ipad ? 500 : 300} width={Ipad ? 500 : 300} alt='' />
      </div>
      <Paper elevation={10} style={paper2Style}>
        <div className='messages'>
          {errorMessage()}
          {successMessage()}
        </div>
        <Grid align='center'>
          <Avatar style={avatar2Style}> <ICONS.Lock /> </Avatar>
          <h2>Sign Up</h2>
        </Grid>
        <TextField label="fullName" value={data.fullName} name="fullName" placeholder='Choose a fullName'
          varient="outlined" fullWidth required style={Text2FieldStyle} onChange={(e) => handleChange(e)} />
        <TextField label='email' name="email" value={data.email} placeholder='Enter Your Email'
          variant="outlined" fullWidth required style={Text2FieldStyle} onChange={(e) => handleChange(e)} />
        <TextField label='password' name="password" value={data.password} placeholder='Enter Password'
          variant="outlined" fullWidth required onChange={(e) => handleChange(e)} style={Text2FieldStyle} />

        <Button type='submit' color='warning' variant="contained" style={btn2style} fullWidth
          onClick={() => { Register(); handleSubmit() }}>Sign Up</Button>

        <br />
        <Typography>

          Everyday is a new start of our life !
        </Typography>
        <Link href='/' >
          Log in
        </Link>
      </Paper>
    </Grid>
  )
}
