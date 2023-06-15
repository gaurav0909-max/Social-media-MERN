// import * as React from 'react';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import { Typography, useMediaQuery } from '@mui/material';
// import { useLocation } from 'react-router-dom';
// import { api } from '../Api';
// import { useEffect } from 'react';

// export default function OthersPost() {

//   const [postdata,setPostdata]=React.useState()
//   const drawerWidth = 240;
//   const Ipad = useMediaQuery('(min-width:900px)');
//   const location = useLocation();
//   const {  id } = location.state;

//   const handleAPI = async()=>{
//     const Posts= await api.myPost.getByName(id)
//     setPostdata(Posts.data.posts)

//   }

//   useEffect(
//     ()=>{
//         handleAPI()
//     },[id]
//   )
//   return (
//     <div>
//       <ImageList
//       variant='standard'
//         sx={{
//           width: Ipad ? `calc(100% - ${drawerWidth}px)` : '100%', height: '700px',
//           ml: Ipad ? `${drawerWidth}px` : null,
//           mt: '20px',
//         }} cols={2}>

//         {postdata?.map((item, index) => (
//           <ImageListItem key={index}>
//             <img
//               src={`${item.postImage}`}
//               srcSet={`${item.postImage}`}
//               alt=''
//               loading="lazy"
//             />
//             <Typography>
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
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { ICONS } from "../Assets/Icons";
import { api } from "../Api";
import { useLocation } from "react-router-dom";
import { formateDate } from "../utils/helpers/formateDate";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export default function OthersPost() {
  const dispatch = useDispatch();
  const [postdata, setPostdata] = useState([]);
  const [error, setError] = useState("");
  const [data, updatedata] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const drawerWidth = 240;
  const Ipad = useMediaQuery("(min-width:900px)");
  const location = useLocation();
  const { userName, fullName, profileImage } = location.state;
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAPI = async () => {
    try {
      const Posts = await api.myPost.getByName(userName);
      setPostdata(Posts.data.data.posts);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data from the API:", error.message.message);
      setError(error.message.message);
    }
  };

  useEffect(() => {
    handleAPI();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  if (error) {
    return (
      <Box
        sx={{
          width: Ipad ? `calc(100% - ${drawerWidth}px)` : "100%",
          ml: Ipad ? `${drawerWidth}px` : null,
          mt: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {error && (
          <img
            src="https://static.vecteezy.com/system/resources/previews/014/814/231/original/a-modern-flat-rounded-icon-of-no-post-yet-vector.jpg"
            alt=""
            style={{
              width: "400px",
              height: "400px",
            }}
          />
        )}
      </Box>
    );
  } else {
    return (

      <Box
        sx={{
          width: Ipad ? `calc(100% - ${drawerWidth}px)` : "100%",
          ml: Ipad ? `${drawerWidth}px` : null,
          mt: "20px",
        }}
      >{loading ?  <img
        src={require("../Assets/66724-pastel-bead-loader.gif")}
        alt="loading..."
        width={200}
        height={200}
      />:<div>
        <Grid container columns={18} sx={{ gap: 1 }}>
          {postdata.map((item, index) => (
            
            <Card
              variant="outlined"
              sx={{
                width: 300,
                borderColor: "#ff0080",
              }}
            >
              <Box
                sx={{
                  marginBottom: "10px",
                  display: "flex",
                  gap: "40px",
                  alignItems: "center",
                }}
              >
                <Avatar
                  variant="soft"
                  sx={{ backgroundColor: "#FF4DA6", color: "white" }}
                  src={profileImage}
                ></Avatar>
                <div>
                  <Typography level="h6">{fullName}</Typography>
                  <Typography level="body3" textAlign={"left"}>
                    {formateDate(item.createdAt)}
                  </Typography>
                </div>

                <Box sx={{ flexGrow: 1 }}>
                  <Tooltip>
                    <IconButton
                      onClick={handleOpenUserMenu}
                      variant="plain"
                      color="neutral"
                      size="sm"
                      sx={{ ml: "auto" }}
                    >
                      <ICONS.Dots />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu} sx={{ gap: 1 }}>
                      <EditIcon sx={{ color: "#ff0080" }} />
                      <Typography
                        textAlign="center"
                        fontWeight={500}
                        sx={{ color: "#ff0080" }}
                      >
                        Edit
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu} sx={{ gap: 1 }}>
                      <DeleteIcon sx={{ color: "#ff0080" }} />
                      <Typography
                        textAlign="center"
                        fontWeight={500}
                        sx={{ color: "#ff0080" }}
                      >
                        Delete
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
              <Box>
                <AspectRatio objectFit="cover" variant="outlined" key={index}>
                  <img alt="" src={item.postImage} />
                </AspectRatio>
              </Box>

              <Box sx={{ display: "flex" }}>
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
                <Typography
                  textAlign="left"
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }}
                >
                  {item.caption}
                </Typography>
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
        </div>
  }
      </Box>
    );
  }
}
