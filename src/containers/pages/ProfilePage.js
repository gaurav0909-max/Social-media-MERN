import { Card, CardActions, IconButton, TextField } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRef } from 'react';
import { DRAWER_WIDTH } from '../../consts/constants';
import {Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions} from '@mui/material';
import { Avatar } from '@mui/joy';
import EditIcon from '@mui/icons-material/Edit';
import { fetchProfileById } from '../../redux/reducers/userProfileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../Api';


function ProfilePage() {

    const dispatch = useDispatch();

    const {profile} = useSelector((state) => state.userProfile);
    const [data,updatedata]=useState('');
    const [userName,setuserName]=useState('');
    const[profileImage,setProfileImage]=useState('');
    const [loading,setLoading]=useState('');
    const imageHandler = (e) => {
        if(e.target.files[0]){
            setProfileImage(e.target.files[0]);
        }
      }
   
    const handleChange=(e)=>{
        updatedata({...data,
            [e.target.name]: e.target.value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        let formdata= new FormData(); 
        formdata.append('userName', data.userName)
        formdata.append('fullName', data.fullName)
        formdata.append('bio', data.bio)
        formdata.append('profileImage',profileImage)

        console.log(formdata)
        const Data = await api.profile.put(formdata)
        console.log(Data)
        
    }

    useEffect(() => {dispatch(fetchProfileById()).then((response) => {
        // console.log(response.payload.data.userName)
        updatedata(response.payload.data)
        setProfileImage(response.payload.data.profileImage)
        setuserName(response.payload.data.userName)
        setLoading(false);
      })
    },[dispatch])
    const [followers,setfollowers]=useState();
    const [followings,setfollowings]=useState();
    const [countPost,setcountPost]=useState();
    const Ipad = useMediaQuery('(min-width:900px)');
    const windowWidth = useRef(window.innerWidth);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
//  console.log(file)
    const handleAPI=async()=>{
        const PostCount= await api.myPost.get()
        setcountPost(PostCount.data.totalPosts)

        const followers= await api.followers.get(userName)
        setfollowers(followers.data.data.TotalFollowers)

        const followings = await api.followings.get(userName)
        setfollowings(followings.data.data.TotalFollowing)

    }
    useEffect(()=>{
        handleAPI()
    },[userName])

    return (
        <div >
            
            <Card elevation={8} circle="true" sx={{
                display: 'flex', justifyContent: 'center', md: { justifyContent: 'center' },
                width: Ipad ? `calc(100% - ${DRAWER_WIDTH}px)` : windowWidth.innerWidth,
                ml: Ipad ? `${DRAWER_WIDTH}px` : null,
                mt: '10px',
                borderRadius:'10px'
            }} >
                <div style={{display:'flex', flexDirection:"column", marginTop:20}}>
                <Avatar
                    display='none'
                    // src ={profileImage}
                    src={profile.data.profileImage }
                    sx={
                        { width: '100px', height: '100px', borderRadius:'70px'}
                    }
                />
                <Typography variant='overline'>{data.fullName}</Typography>
                </div>
                
                <CardContent sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Typography gutterBottom variant="h5" component="div">
                        USER PROFILE
                    </Typography>
                    
                    <Typography variant="h4" color="text.secondary">
                    {/* {localStorage.getItem('data.email').split('@')[0].toUpperCase()} */}
                    {data.userName}
                    {/* {localStorage.getItem('token')} */}
                    </Typography>
                        <div style={{display:'flex', justifyContent:'space-around', gap:'20px'}}>
                           <div>
                                <Typography>{countPost}</Typography>
                                <Button variant='contained' color='error'>Posts</Button>
                           </div>
                            <div>
                                <Typography>{followers}</Typography>
                                <Button variant='contained' color='error'>Follwers</Button>
                            </div>
                           <div>
                                <Typography>{followings}</Typography>
                                <Button variant='contained' color='error' >Following</Button>  
                           </div>
                        </div>
                       {/* <ButtonGroup variant="outlined" sx={{ gap: "50px" , m:2}}>
                          <Button>Posts</Button>
                          <Button >Follwers</Button>
                          <Button>Following</Button>     
                       </ButtonGroup> */}
                       
                      <Typography sx={{p:1}}>
                        {data.bio}
                      </Typography>
                      {/* <Typography sx={{p:1}}>
                      My hobbies are Travelling and Photography...
                      </Typography>
                      <Typography sx={{p:1}}>
                      here is my some of memories that defines my life.
                      </Typography> */}
                </CardContent>
                <CardActions>
               <IconButton sx={{marginBottom:'40px'}} color='error' onClick={handleClickOpen}> 
               <EditIcon/>
               </IconButton>
                <Dialog open={open} onClose={handleClose} >
                    <DialogTitle>Edit Profile</DialogTitle>
                     <DialogContent>
                     <DialogContentText>
                        Make changes to your profile
                     </DialogContentText>
                     <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      name="userName"
                      label="userName"
                      type="userName"
                      onChange={handleChange}
                      fullWidth
                      variant="standard"
                       />
                       <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="fullName"
                      name="fullName"
                      type="fullName"
                      onChange={handleChange}
                      fullWidth
                      variant="standard"
                       />
                       <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      name="bio"
                      label="bio"
                      type="bio"
                      fullWidth
                      onChange={handleChange}
                      variant="standard"
                       />
                       <Avatar 
                       sx={{
                            width:300,
                            height:300
                       }} >
                       <input  type='file' id="name" name='profileImage'  accept= "image/png, image/jpeg, image/jpg" loading={true}
                       onChange={(e)=>{ imageHandler(e);}}/>
                       </Avatar>
                       
                       </DialogContent>
                      <DialogActions>
                              <Button color='error' onClick={handleClose}>Cancel</Button>
                              < Button color='error' onClick={(e)=>{handleSubmit(e); handleClose()}}>Update</Button>
                      </DialogActions>
                </Dialog>
                </CardActions>
            </Card>
            
        </div>
    )
}

export default ProfilePage

