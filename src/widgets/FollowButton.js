import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import { api } from '../Api';

const FollowButton = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const location = useLocation();
  const { userName,} = location.state;
  const handleButtonClick = () => {
    setIsFollowing(prevState => !prevState);
  };
  
  const handleAPI =async()=>{
    const followers= await api.followers.get(userName)
    console.log(followers.data.data.TotalFollowers)
    
  }

  useEffect(()=>{
    handleAPI()
  })

  return (
    <Button variant="contained" color={isFollowing ? 'secondary' : 'primary'} onClick={()=>{handleButtonClick()}}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;