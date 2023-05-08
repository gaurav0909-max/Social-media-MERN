import { Card, CardMedia } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import React from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRef } from 'react';
import { DRAWER_WIDTH } from '../../consts/constants';
function ProfilePage() {

    const Ipad = useMediaQuery('(min-width:900px)');
    const windowWidth = useRef(window.innerWidth);

   
    return (
        <div >
            <Card elevation={8} circle={true} sx={{
                display: 'flex', justifyContent: 'center', md: { justifyContent: 'center' },
                width: Ipad ? `calc(100% - ${DRAWER_WIDTH}px)` : windowWidth.innerWidth,
                ml: Ipad ? `${DRAWER_WIDTH}px` : null,
                mt: '20px'
            }} >
                <CardMedia
                    component="img"
                    image="https://img.freepik.com/premium-vector/young-smiling-man-adam-avatar-3d-vector-people-character-illustration-cartoon-minimal-style_365941-687.jpg"
                    alt="CardMedia Image Example"
                    sx={
                        { width: '100px', md: { width: '200px' } }

                    }
                    title="CardMedia Image Example"
                />
                <CardContent sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Typography gutterBottom variant="h5" component="div">
                        USER PROFILE
                    </Typography>
                    <Typography variant="h4" color="text.secondary">
                    {localStorage.getItem('data.email').split('@')[0].toUpperCase()}
                   
                    </Typography>
                    <ButtonGroup variant="outlined" sx={{ gap: "50px" }}>
                        <Button>Posts</Button>
                        <Button >Follwers</Button>
                        <Button>Following</Button>
                             
                    </ButtonGroup>
                    
                   
                </CardContent>
            </Card>
            
        </div>
    )
}

export default ProfilePage
// import React, { useState } from 'react';
// import { TextField, Button, useMediaQuery } from '@mui/material'
// import { DRAWER_WIDTH } from '../../consts/constants';
// import Card from '@mui/material/Card';
// import CardMedia from '@mui/material/CardMedia';
// import { useRef } from 'react';
// const ProfileForm = () => {
//   const [data,setData]= useState({
//     username: '',
//     phone: '',
//     bio:'',
//     website: '',
//   })
//   const [usernameError,setUsernameError] = useState(false)
//   const [phoneError,setPhoneError] = useState(false)
//   const [websiteError,setWebsiteError] = useState(false)
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
// };
// console.log(data);
// const handleSubmit = (event) => {
//     event.preventDefault();
//     let errors = {};
//     let isValid = true;
  
//     // Check if the username field is empty
//     if (!data.username.trim()) {
//       errors.username = 'Username is required';
//       isValid = false;
//     }
  
//     // Check if the phone field is empty
//     if (!data.phone.trim()) {
//       errors.phone = 'Phone is required';
//       isValid = false;
//     }
  
//     // Check if the website field is empty
//     if (!data.website.trim()) {
//       errors.website = 'Website is required';
//       isValid = false;
//     }
  
  
//     // Check if the phone is valid
//     if (data.phone.trim() && !/^\+?[1-9]\d{1,14}$/.test(data.phone)) {
//       errors.phone = 'Invalid phone number';
//       isValid = false;
//     }
  
//     // Check if the website is valid
//     if (data.website.trim() && !/^https?:\/\/.+/.test(data.website)) {
//       errors.website = 'Invalid website URL';
//       isValid = false;
//     }
  
//     if (isValid) {
//       // Handle form submission here
//       console.log('Form submitted successfully!');
//     } else {
//       // Display error messages
//       setUsernameError(errors.username || '');
//       setPhoneError(errors.phone || '');
//       setWebsiteError(errors.website || '');
//     }
//   };
  
//   const Ipad = useMediaQuery('(min-width:900px)');
//       const windowWidth = useRef(window.innerWidth);
//   return (
//     <Card sx={{
//         display: 'flex', justifyContent: 'center', md: { justifyContent: 'center' },
//                         width: Ipad ? `calc(100% - ${DRAWER_WIDTH}px)` : windowWidth.innerWidth,
//                         ml: Ipad ? `${DRAWER_WIDTH}px` : null,
//                         mt: '20px'
//     }}>
//         <CardMedia
//                     component="img"
//                     image="https://img.freepik.com/premium-vector/young-smiling-man-adam-avatar-3d-vector-people-character-illustration-cartoon-minimal-style_365941-687.jpg"
//                     alt="CardMedia Image Example"
//                     sx={
//                         { width: '500px', md: { width: '200px' } }

//                     }
//                     title="CardMedia Image Example"
//                 />
//     <form 
//      onSubmit={handleSubmit}>
//       <TextField
//         label="Username"
//         name="username"
//         variant="outlined"
//         onChange={(e)=>handleChange(e)}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Bio"
//         name="bio"
//         variant="outlined"
//         onChange={(e)=>handleChange(e)}
//         fullWidth
//         margin="normal"
//         multiline
//         rows={3}
//       />
//       <TextField
//         label="Phone"
//         name="phone"
//         variant="outlined"
//         onChange={(e)=>handleChange(e)}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Website"
//         name='website'
//         variant="outlined"
//         onChange={(e)=>handleChange(e)}
//         fullWidth
//         margin="normal"
//       />
//       <Button variant="contained" color="primary" type="submit">Save Changes</Button>
//     </form>
//     </Card>
//   );
// };

// export default ProfileForm;

