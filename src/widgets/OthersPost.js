import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Typography, useMediaQuery } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { api } from '../Api';
import { useEffect } from 'react';

export default function OthersPost() {
  
  const [postdata,setPostdata]=React.useState()
  const drawerWidth = 240;
  const Ipad = useMediaQuery('(min-width:900px)');
  const location = useLocation();
  const {  id } = location.state;

  const handleAPI = async()=>{
    const Posts= await api.myPost.getByName(id)
    setPostdata(Posts.data)
  }

  useEffect(
    ()=>{
        handleAPI()
    },[id]
  )
  return (
    <div>
      <ImageList 
      variant='standard'
        sx={{
          width: Ipad ? `calc(100% - ${drawerWidth}px)` : '100%', height: '700px',
          ml: Ipad ? `${drawerWidth}px` : null,
          mt: '20px',
        }} cols={2}>

        {postdata?.map((item, index) => (
          <ImageListItem key={index}>
            <img
              src={`${item.postImage}`}
              srcSet={`${item.postImage}`}
              alt=''
              loading="lazy"
            />
            <Typography>
              {item.caption}
            </Typography>
          </ImageListItem>

        ))}
      </ImageList>
    </div>
  );
}