import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';

export default function UserPost() {

  const data = useSelector((state) => state.data.data);
  console.log(data);
  const drawerWidth = 240;
  const Ipad = useMediaQuery('(min-width:900px)');

  
  return (
    <div>

      <ImageList
        sx={{
          width: Ipad ? `calc(100% - ${drawerWidth}px)` : '100%', height: '700px',
          ml: Ipad ? `${drawerWidth}px` : null,
          mt: '20px',
        }} columns={18}>

        {data.data.posts.map((item, index) => (
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

// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1618886487795-ea7aaa687631?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',

//   },
//   {
//     img: 'https://images.unsplash.com/photo-1593208272095-860ae33d1d63?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',

//   },
//   {
//     img: 'https://images.unsplash.com/photo-1679775912653-21e229b17854?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',

//   },
//   {
//     img: 'https://images.unsplash.com/photo-1672243775751-4ab4fe14d3ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',

//   },
//   {
//     img: 'https://images.unsplash.com/photo-1681019652572-1b39a15271ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=653&q=80',

//   },
//   {
//     img: 'https://images.unsplash.com/photo-1657794001416-1caf76b4b49a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfGlVSXNuVnRqQjBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',

//   },
//   {
//     img: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',

//   },
//   {
//     img: 'https://images.unsplash.com/photo-1599148401005-fe6d7497cb5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',

//   },
//   {
//     img: 'https://images.unsplash.com/photo-1670722111236-a8b246ed70fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',

//   },
//   {
//     img: 'https://images.unsplash.com/photo-1675501347885-211a486cd042?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',

//   },
//   {
//     img: 'https://images.unsplash.com/photo-1681802956281-29dff04ed22f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',

//   },
//   {
//     img: 'https://images.unsplash.com/photo-1559348349-86f1f65817fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',

//   },
//   {
//     img: 'https://images.unsplash.com/photo-1606924734941-2badc148f44c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
//   }

// ];