// import * as React from 'react';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import { Typography, useMediaQuery } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { fetchData } from '../redux/reducers/dataSlice';
// import { useState } from 'react';
// export default function UserPost() {
//   const dispatch =useDispatch()
//   const [myPost, setmyPost]=useState([])
//   const drawerWidth = 240;
//   const Ipad = useMediaQuery('(min-width:900px)');

//   useEffect(() => {dispatch(fetchData()).then((response) => {
//     console.log("Here----------->",response.payload.data.posts)
//     setmyPost(response.payload.data.posts)
//   })
// },[dispatch])
//   return (
//     <div>

//       <ImageList
//         sx={{
//           width: Ipad ? `calc(100% - ${drawerWidth}px)` : '100%', height: '700px',
//           ml: Ipad ? `${drawerWidth}px` : null,
//           mt: '20px',
//         }} columns={18}>

//         {myPost.map((item, index) => (
//           <ImageListItem sm={18} key={index}>
//             <img
//               src={`${item.postImage}?w=358&h=358&fit=crop&auto=format`}
//               srcSet={`${item.postImage}?w=358&h=358&fit=crop&auto=format&dpr=2 2x`}
//               alt=''
//               loading="lazy"
//             />
//             <Typography key={index}>
//               {item.caption}
//             </Typography>

//           </ImageListItem>

//         ))}

//       </ImageList>
//     </div>
//   );
// }
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";

import { Button, Checkbox, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, Grid, useMediaQuery } from "@mui/material";
import { fetchData } from "../redux/reducers/dataSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { ICONS } from "../Assets/Icons";
import { fetchProfileById } from "../redux/reducers/userProfileSlice";

export default function UserPost() {
  const dispatch = useDispatch();
  const [myPost, setmyPost] = useState([]);
  const [data, updatedata] = useState([]);
  const [open, setOpen] = useState(false);
  const drawerWidth = 240;
  const Ipad = useMediaQuery("(min-width:900px)");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  useEffect(() => {
    dispatch(fetchData()).then((response) => {
      console.log("Here----------->", response.payload.data.posts);
      setmyPost(response.payload.data.posts);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProfileById()).then((response) => {
      // console.log(response.payload.data.userName)
      updatedata(response.payload.data);
    });
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box 
      sx={{
        width: Ipad ? `calc(100% - ${drawerWidth}px)` : "100%",
        ml: Ipad ? `${drawerWidth}px` : null,
        mt: "20px",
        display: "flex",
      }}
    >
      <Grid container columns={18}>
        {myPost.map((item, index) => (
          <Card 
            variant="outlined"
            sx={{
              width: 300,
              margin: "4px",
              
            }}
            key={index}
            elevation={12}
          >
            <Box sx={{ marginBottom: "10px", display: "flex", gap: "20px" }}>
              <Avatar
                variant="soft"
                sx={{ backgroundColor: "#FF4DA6", color: "white" }}
                src={data.profileImage}
              ></Avatar>
              <Typography level="h4">{data.userName}</Typography> 
              <IconButton
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ ml: "auto" }}
              >
                <ICONS.Dots />
              </IconButton>
            </Box>
            <Box>
              <AspectRatio objectFit="cover" variant="outlined" key={index}>
                <img alt="" src={item.postImage} />
              </AspectRatio>
            </Box>

            <Box sx={{ display: "flex"}}>
              <IconButton variant="plain" color="neutral" size="sm">
                <Checkbox
                  {...label}
                  icon={<ICONS.LikeBorder sx={{ color: "red" }} />}
                  checkedIcon={<ICONS.Like sx={{ color: "red" }} />}
                />
              </IconButton>
              <IconButton
                variant="plain"
                color="neutral"
                size="sm"
                onClick={handleClickOpen}
              >
                {/* <Checkbox {...label} icon={<ICONS.CommentsBorder sx={{ color: 'black' }} />} checkedIcon={<ICONS.Comments sx={{ color: 'black' }} />} /> */}
                <ICONS.CommentsBorder />
              </IconButton>
              <IconButton variant="plain" color="neutral" size="sm">
                <ICONS.Share />
              </IconButton>
            </Box>
            <Box>
              <Typography textAlign="left">{item.caption}</Typography>
            </Box>

           
          </Card>
          
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose} circle={true}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <DialogTitle color="#FF0080">Comments</DialogTitle>
                <Button onClick={handleClose} color="error">
                  <ICONS.Cross />
                </Button>
              </div>
              <Divider />
              <DialogContent>
                <DialogContentText>
                  All comments will be shown here!
                </DialogContentText>

                <Card sx={{ display: "flex", flexDirection: "row", gap: 7 }}>
                  <Avatar
                    src="https://img.freepik.com/premium-vector/person-avatar-icon-design-vector-multiple-use-vector-illustration_625349-287.jpg?w=360"
                    sx={{ height: "70px", width: "70px" }}
                  />
                  <div>
                    <Typography variant="h5" textColor="#FF0080">
                      gaurav0909
                    </Typography>
                    <Typography variant="subtitle1">
                      You and strong Wi-Fi are what I only need in my life.
                    </Typography>
                  </div>
                </Card>
                <Card sx={{ display: "flex", flexDirection: "row", gap: 7 }}>
                  <Avatar
                    src="https://img.freepik.com/premium-vector/person-avatar-icon-design-vector-multiple-use-vector-illustration_625349-287.jpg?w=360"
                    sx={{ height: "70px", width: "70px" }}
                  />
                  <div>
                    <Typography variant="h5" textColor="#FF0080">
                      Jayhind123
                    </Typography>
                    <Typography variant="subtitle1">
                      You really light up a room…and my Instagram feed.
                    </Typography>
                  </div>
                </Card>
                <Card sx={{ display: "flex", flexDirection: "row", gap: 7 }}>
                  <Avatar
                    src="https://img.freepik.com/premium-vector/person-avatar-icon-design-vector-multiple-use-vector-illustration_625349-287.jpg?w=360"
                    sx={{ height: "70px", width: "70px" }}
                  />
                  <div>
                    <Typography variant="h5" textColor="#FF0080">
                      gaurav0909
                    </Typography>
                    <Typography variant="subtitle1">
                      This has such a clean composition
                    </Typography>
                  </div>
                </Card>
                <Card sx={{ display: "flex", flexDirection: "row", gap: 7 }}>
                  <Avatar
                    src="https://img.freepik.com/premium-vector/person-avatar-icon-design-vector-multiple-use-vector-illustration_625349-287.jpg?w=360"
                    sx={{ height: "70px", width: "70px" }}
                  />
                  <div>
                    <Typography variant="h5" textColor="#FF0080">
                      gaurav0909
                    </Typography>
                    <Typography variant="subtitle1">
                      You and strong Wi-Fi are what I only need in my life.
                    </Typography>
                  </div>
                </Card>
                <Card sx={{ display: "flex", flexDirection: "row", gap: 7 }}>
                  <Avatar
                    src="https://img.freepik.com/premium-vector/person-avatar-icon-design-vector-multiple-use-vector-illustration_625349-287.jpg?w=360"
                    sx={{ height: "70px", width: "70px" }}
                  />
                  <div>
                    <Typography variant="h5" textColor="#FF0080">
                      Mahi777
                    </Typography>
                    <Typography variant="subtitle1">
                      How do you make a phone selfie look so professional?
                    </Typography>
                  </div>
                </Card>
                <Card sx={{ display: "flex", flexDirection: "row", gap: 7 }}>
                  <Avatar
                    src="https://img.freepik.com/premium-vector/person-avatar-icon-design-vector-multiple-use-vector-illustration_625349-287.jpg?w=360"
                    sx={{ height: "70px", width: "70px" }}
                  />
                  <div>
                    <Typography variant="h5" textColor="#FF0080">
                      hiren4434
                    </Typography>
                    <Typography variant="subtitle1">
                      Excuse me, but who is this model I’m following?
                    </Typography>
                  </div>
                </Card>
                <Card sx={{ display: "flex", flexDirection: "row", gap: 7 }}>
                  <Avatar
                    src="https://img.freepik.com/premium-vector/person-avatar-icon-design-vector-multiple-use-vector-illustration_625349-287.jpg?w=360"
                    sx={{ height: "70px", width: "70px" }}
                  />
                  <div>
                    <Typography variant="h5" textColor="#FF0080">
                      {data.userName}
                    </Typography>
                   
                  </div>
                </Card>
              </DialogContent>
              {/* <DialogActions>
                <TextField
                  fullWidth
                  name="comments"
                  label="Add your comments"
                  onChange={handleChange}
                />
                <Button
                  color="error"
                  onClick={() => {
                    handleValue();
                  }}
                >
                  Post
                </Button>
              </DialogActions> */}
            </Dialog>
    </Box>
  );
}
