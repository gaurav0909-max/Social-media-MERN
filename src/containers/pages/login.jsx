import React from 'react'
import { Grid, Paper, Avatar, TextField, Link, Button, Typography } from '@mui/material';
import { ICONS } from '../../Assets/Icons';
import { useSnackbar } from "notistack";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { paperStyle, avatarStyle, TextFieldStyle, btnstyle } from '../../consts/constants';
import { api } from '../../Api';

const Login = () => {

    const initialState = {
        email: '',
        password: ''
    }
    const Navigate = useNavigate();
    const [data, setData] = useState(initialState);
    const [login, setLogin] = useState(false);
    const [error, setError] = useState(false);
    
    const Ipad = useMediaQuery('(min-width:1000px)');
    const { enqueueSnackbar }= useSnackbar();
    const handleValidate=(name,value)=>{
        switch(name){
            case 'email':
                if(!value || value.trim() === '') {
                    return 'Email is required';
                }else return '';

            case 'password':
                if(!value || value.trim() === '') {
                    return 'Password is required';
                }else return '';
                default: return '';
    }
}
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        setError({
            ...error,[name]:handleValidate(name,value)
        })

    };


    const handleLogin = async () => {

        const Data = await api.auth.login(data)
        console.log(Data.data);

        if (Data.data.Password === "Incorrect password !") {
            setLogin(false)
            enqueueSnackbar('Please Try Again', { variant: 'error' });
        }
        else {
            setLogin(true);
            Navigate("/home")
            // localStorage.setItem("data.email", data.email)
            localStorage.setItem("token", Data.data.token);
            enqueueSnackbar('Login Successful', { variant: 'success' });
        }
        console.log(Data.data.token)
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      let errorObj = {}
      
      Object.keys(data).forEach((value) => {
        let error = handleValidate(value, data[value])
        if(error){
          errorObj[value] = error
        }
      })
      if(Object.values(errorObj).length){
        setError(errorObj)
        return
      }
      await handleLogin()
    }
    return (
        <Grid sx={{ display: 'flex', flexDirection: Ipad ? 'row' : 'Column' }}>
            <div>
                <img src='https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7883.jpg?w=2000' width={Ipad ? 600 : 500} height={Ipad ? 600 : 500} alt='' />
            </div>
            <Paper elevation={10} style={paperStyle} >

                <Grid align='center'>
                    <Avatar style={avatarStyle}><ICONS.Login /></Avatar>
                    <h2 >Log In</h2>
                </Grid>
                <TextField label='Email' name='email' placeholder='Enter Your Email' value={data.email} required
                    variant="outlined" fullWidth style={TextFieldStyle} onChange={(e) => handleChange(e)} />
                <span>{error['email']}</span>
                <TextField label='Password' name='password' value={data.password} placeholder='Enter password' required
                    variant="outlined" fullWidth onChange={(e) => handleChange(e)} style={TextFieldStyle} />

                <span>{error['password']}</span>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth
                    onClick={(e) => handleSubmit(e) } >Log in</Button>

                <Typography > Don't have an account ?
                    <Link href="/register">
                        Sign Up
                    </Link>
                </Typography>
                <br />
                <Typography>
                    Have a Goood Day !
                </Typography>
            </Paper>

        </Grid>
    )
}

export default Login

