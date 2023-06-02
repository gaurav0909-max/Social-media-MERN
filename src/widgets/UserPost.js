import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Typography, useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchData } from '../redux/reducers/dataSlice';
import { useState } from 'react';
export default function UserPost() {
  const dispatch =useDispatch()
  const [myPost, setmyPost]=useState([])
  const drawerWidth = 240;
  const Ipad = useMediaQuery('(min-width:900px)');

  useEffect(() => {dispatch(fetchData()).then((response) => {
    console.log("Here----------->",response.payload.data.posts)
    setmyPost(response.payload.data.posts)
  })
},[dispatch])
  return (
    <div>

      <ImageList
        sx={{
          width: Ipad ? `calc(100% - ${drawerWidth}px)` : '100%', height: '700px',
          ml: Ipad ? `${drawerWidth}px` : null,
          mt: '20px',
        }} columns={18}>

        {myPost.map((item, index) => (
          <ImageListItem sm={18} key={index}>
            <img
              src={`${item.postImage}?w=358&h=358&fit=crop&auto=format`}
              srcSet={`${item.postImage}?w=358&h=358&fit=crop&auto=format&dpr=2 2x`}
              alt=''
              loading="lazy"
            />
            <Typography key={index}>
              {item.caption}
            </Typography>
            
          </ImageListItem>

        ))}

      </ImageList>
    </div>
  );
}

