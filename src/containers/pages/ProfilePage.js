import { Card, CardActions, Divider, IconButton, Skeleton, TextField } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRef } from 'react';
import { DRAWER_WIDTH } from '../../consts/constants';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Avatar } from '@mui/joy';
import EditIcon from '@mui/icons-material/Edit';
import { fetchProfileById } from '../../redux/reducers/userProfileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../Api';
import { ICONS } from '../../Assets/Icons';


function ProfilePage() {

    const dispatch = useDispatch();

    const { profile } = useSelector((state) => state.userProfile);
    const [data, updatedata] = useState('');
    const [userName, setuserName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [loading, setLoading] = useState(true);
    const imageHandler = (e) => {
        if (e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    }

    const handleChange = (e) => {

        const { name, value } = e.target;

       
        if (name === "userName") {
         
          const specialChars = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g
          
          // Check if the value contains any special characters
          if (specialChars.test(value)) {
            // Special characters found, display an error or handle accordingly
            console.log("Username cannot contain special characters");
            return;
          }
        }
        updatedata({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let formdata = new FormData();
        formdata.append('userName', data.userName)
        formdata.append('fullName', data.fullName)
        formdata.append('bio', data.bio)
        formdata.append('profileImage', profileImage)

        console.log(formdata)
        const Data = await api.profile.put(formdata)
        console.log(Data)

    }

    useEffect(() => {
        dispatch(fetchProfileById()).then((response) => {
            // console.log(response.payload.data.userName)
            updatedata(response.payload.data)
            setProfileImage(response.payload.data.profileImage)
            setuserName(response.payload.data.userName)
            setLoading(false);
        })
    }, [dispatch])
    const [followers, setfollowers] = useState();
    const [followings, setfollowings] = useState();
    const [showfollowers, setshowfollowers] = useState([]);
    const [showfollowings, setshowfollowings] = useState([])
    const [start, setStart] = useState(false);
    const [initial, setInitial] = useState(false);
    const Ipad = useMediaQuery('(min-width:900px)');
    const windowWidth = useRef(window.innerWidth);
    const [open, setOpen] = React.useState(false);
    const [countPost, setcountPost] = useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickStart = () => {
        setStart(true);
    };

    const handleOff = () => {
        setStart(false);
    };

    const handleClickInitial = () => {
        setInitial(true);
    };

    const handleEnd = () => {
        setInitial(false);
    };
    //  console.log(file)
    const handleAPI = async () => {


        const followers = await api.followers.get(userName)
        setshowfollowers(followers.data.data.followers)
        console.log(followers.data.data.followers)
        setfollowers(followers.data.data.TotalFollowers)

        const followings = await api.followings.get(userName)
        setshowfollowings(followings.data.data.following)
        setfollowings(followings.data.data.TotalFollowing)

        const PostCount = await api.myPost.get()
        setcountPost(PostCount.data.totalPosts)
        setLoading(false);

    }
    // useEffect(() => {
    //     handleAPI()
    // }, [userName])
    const dialogWidth = 500;
    return (
        <div >

            <Card elevation={8} circle="true" sx={{
                display: 'flex', justifyContent: 'center', md: { justifyContent: 'center' },
                width: Ipad ? `calc(100% - ${DRAWER_WIDTH}px)` : windowWidth.innerWidth,
                ml: Ipad ? `${DRAWER_WIDTH}px` : null,
                mt: '10px',
                borderRadius: '10px'
            }} >
                <div style={{ display: 'flex', flexDirection: "column", marginTop: 20 }}>
                    <Avatar
                        display='none'
                        // src ={profileImage}
                        src={profile.data.profileImage}
                        sx={
                            { width: '100px', height: '100px', borderRadius: '70px' }
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
                    <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px' }}>
                        <div>
                            {
                                loading ? <Skeleton variant="text" width={50} height={50} /> :
                                    <Typography >{countPost}

                                    </Typography>
                            }

                            <Button variant='contained' style={{ backgroundColor: '#ff0080' }} >Posts</Button>

                        </div>
                        <div>
                            {
                                loading ? <Skeleton variant="text" width={50} height={50} /> :
                                    <Typography >
                                        {followers}
                                    </Typography>
                            }
                            <Button variant='contained' style={{ backgroundColor: '#ff0080' }}
                                onClick={handleClickStart}>Followers</Button>
                        </div>
                        <div>
                            {
                                loading ? <Skeleton variant="text" width={50} height={50} /> :
                                    <Typography >
                                        {followings}
                                    </Typography>
                            }
                            <Button variant='contained' style={{ backgroundColor: '#ff0080' }}
                                onClick={handleClickInitial} >Following</Button>
                        </div>
                    </div>
                    {/* <ButtonGroup variant="outlined" sx={{ gap: "50px" , m:2}}>
                          <Button>Posts</Button>
                          <Button >Follwers</Button>
                          <Button>Following</Button>     
                       </ButtonGroup> */}

                    <Typography sx={{ p: 1 }}>
                        <pre>
                        {data.bio}
                        </pre>
                        
                    </Typography>
                    {/* <Typography sx={{p:1}}>
                      My hobbies are Travelling and Photography...
                      </Typography>
                      <Typography sx={{p:1}}>
                      here is my some of memories that defines my life.
                      </Typography> */}
                </CardContent>
                <CardActions>
                    <IconButton sx={{ marginBottom: '40px' }} style={{ backgroundColor: '#ff0080', color: 'white' }} onClick={handleClickOpen}>
                        <EditIcon />
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
                                    width: 300,
                                    height: 300
                                }} >
                                <input type='file' id="name" name='profileImage' accept="image/png, image/jpeg, image/jpg" loading={true}
                                    onChange={(e) => { imageHandler(e); }} />
                            </Avatar>

                        </DialogContent>
                        <DialogActions>
                            <Button style={{ backgroundColor: '#ff0080', color: 'white' }} onClick={handleClose}>Cancel</Button>
                            < Button style={{ backgroundColor: '#ff0080', color: 'white' }} onClick={(e) => { handleSubmit(e); handleClose() }}>Update</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={start} onClose={handleOff} circle={true} PaperProps={{ style: { width: dialogWidth } }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-between",
                        }}>
                            <DialogTitle color='#FF0080'>Followers</DialogTitle>
                            <Button onClick={handleOff} style={{ backgroundColor: '#ff0080' }}>
                                <ICONS.Cross sx={{ color: 'white' }} />
                            </Button>
                        </div>
                        <Divider />
                        <DialogContent>

                            {showfollowers.map((item, index) => (
                                <Card fullwidth sx={{ display: 'flex', flexDirection: 'row', gap: 7 }} key={index}>
                                    <Avatar
                                        src={item.profileImage}
                                        sx={{ height: '70px', width: '70px' }}
                                    />
                                    <Typography variant='h5' textColor='#FF0080'>
                                        {item.userName}
                                    </Typography>
                                </Card>

                            ))}
                        </DialogContent>

                    </Dialog>

                    <Dialog open={initial} onClose={handleEnd} circle={true} PaperProps={{ style: { width: dialogWidth } }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-between",
                        }}>
                            <DialogTitle color='#FF0080'>Followings</DialogTitle>
                            <Button onClick={handleEnd} style={{ backgroundColor: '#ff0080' }}>
                                <ICONS.Cross sx={{ color: 'white' }} />
                            </Button>
                        </div>
                        <Divider />
                        <DialogContent>

                            {showfollowings.map((item, index) => (
                                <Card fullwidth sx={{ display: 'flex', flexDirection: 'row', gap: 7 }} key={index}>
                                    <Avatar
                                        src={item.profileImage}
                                        sx={{ height: '70px', width: '70px' }}
                                    />
                                    <Typography variant='h5' textColor='#FF0080'>
                                        {item.userName}
                                    </Typography>
                                </Card>

                            ))}
                        </DialogContent>

                    </Dialog>
                </CardActions>
            </Card>

        </div>
    )
}

export default ProfilePage

