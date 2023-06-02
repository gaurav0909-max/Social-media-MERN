import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRef } from 'react';
import { DRAWER_WIDTH } from '../../consts/constants';
import { Avatar } from '@mui/joy';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { api } from '../../Api';

function CustomizeProfile() {
    const [count, setCount] = useState(0)
    const [followers, setfollowers] = useState();
    const [followings, setfollowings] = useState();
    const Ipad = useMediaQuery('(min-width:900px)');
    const windowWidth = useRef(window.innerWidth);
    const location = useLocation();
    const { userName, bio, profileImage, fullName, id} = location.state;

    const followAPI = async () => {
        const follow = await api.follow.post(userName)
        console.log(follow.data)
        handleAPI()
    }

    const unfollowAPI = async () => {
        const unfollow = await api.unfollow.post(userName)
        console.log(unfollow.data)
        handleAPI()
    }

    const handleAPI = async () => {
        const followers = await api.followers.get(userName)
        setfollowers(followers.data.data.TotalFollowers)

        const followings = await api.followings.get(userName)
        setfollowings(followings.data.data.TotalFollowing)

        const PostCount = await api.myPost.getByName(id)
        console.log(PostCount.data)
        setCount(PostCount.data.totalPosts)
    }
    useEffect(() => {
        handleAPI()
    }, [userName])

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
                        src={profileImage}

                        sx={
                            { width: '100px', height: '100px', borderRadius: '70px' }
                        }
                    />
                    <Typography variant='overline'>{fullName}</Typography>
                </div>

                <CardContent sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Typography gutterBottom variant="h5" component="div">
                        USER PROFILE
                    </Typography>

                    <Typography variant="h4" color="text.secondary">
                        {/* {localStorage.getItem('data.email').split('@')[0].toUpperCase()} */}
                        {userName}
                        {/* {localStorage.getItem('token')} */}
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px' }}>
                        <div>
                            <Typography>{count}</Typography>
                            <Button variant='text' color='error'>Posts</Button>
                        </div>
                        <div>
                            <Typography>{followers}</Typography>
                            <Button variant='text' color='error'>Follwers</Button>
                        </div>
                        <div>
                            <Typography>{followings}</Typography>
                            <Button variant='text' color='error'>Following</Button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                        <Button variant='contained' color='error' onClick={() => { followAPI() }}>Follow</Button>
                        <Button variant='contained' color='error' onClick={() => { unfollowAPI() }}>Unfollow</Button>
                    </div>
                    {/* <ButtonGroup variant="outlined" sx={{ gap: "50px" , m:2}}>
                          <Button>Posts</Button>
                          <Button >Follwers</Button>
                          <Button>Following</Button>     
                       </ButtonGroup> */}

                    <Typography sx={{ p: 1 }}>
                        {bio}
                    </Typography>
                    {/* <Typography sx={{p:1}}>
                      My hobbies are Travelling and Photography...
                      </Typography>
                      <Typography sx={{p:1}}>
                      here is my some of memories that defines my life.
                      </Typography> */}
                </CardContent>
            </Card>
        </div>
    )
}

export default CustomizeProfile