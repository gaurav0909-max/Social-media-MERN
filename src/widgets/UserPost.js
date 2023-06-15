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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { fetchData } from "../redux/reducers/dataSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { ICONS } from "../Assets/Icons";
import { fetchProfileById } from "../redux/reducers/userProfileSlice";
import { formateDate } from "../utils/helpers/formateDate";
import { api } from "../Api";

export default function UserPost({ user }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [showTextField, setShowTextField] = useState(false);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [myPost, setmyPost] = useState([]);
  const [data, updatedata] = useState([]);
  const [open, setOpen] = useState(false);
  const drawerWidth = 240;
  const Ipad = useMediaQuery("(min-width:900px)");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [like, setLike] = useState(0);
  const handleEdit = async(id) => {
    setShowTextField(true);
    console.log('id', id)
  };

  const handleDelete = async (id) => {
    console.log(id);
    const details = await api.myPost.delete(id);
    await window.location.reload();
    console.log(details);
  };
  
  const handleLike = async(id)=>{
    const likes = await api.like.post(id)
    console.log('likes', likes.data.message)
  }
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Updated comment:", comment);
    setShowTextField(false);
  };

  console.log("user", user);

  const handlePost = async () => {
    const post = await api.myPost.getByName(user);
    setmyPost(post.data.data.posts);
  };

  useEffect(() => {
    dispatch(fetchProfileById()).then((response) => {
      updatedata(response.payload.data.data.user);
    }, handlePost());
  }, [dispatch, user]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let x = Math.random() * 1000;
  let y = Math.floor(x);
  return (
    <Box
      sx={{
        width: Ipad ? `calc(100% - ${drawerWidth}px)` : "100%",
        ml: Ipad ? `${drawerWidth}px` : null,
        mt: "20px",
        display: "flex",
      }}
    >
      <Grid container columns={18} sx={{ gap: 1 }}>
        {myPost.map((item, index) => (
          <Card
            variant="outlined"
            sx={{
              width: 300,
              borderColor: "#ff0080",
            }}
            key={index}
            elevation={12}
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
                src={data.profileImage}
              ></Avatar>
              <div>
                <Typography level="h6">{data.fullName}</Typography>
                <Typography level="body3" textAlign={"left"}>
                  {/* {item.createdDate.slice(0, 10)} */}
                  {formateDate(item.createdAt || item.createdDate)}
                </Typography>
              </div>
              <Box sx={{ flexGrow: 2 }}>
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
                  key={index}
                >
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      handleEdit(item._id);
                    }}
                    sx={{ gap: 1 }}
                  >
                    <EditIcon sx={{ color: "#ff0080" }} />
                    <Typography
                      textAlign="center"
                      fontWeight={500}
                      sx={{ color: "#ff0080" }}
                    >
                      Edit
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      handleDelete(item._id);
                    }}
                    sx={{ gap: 1 }}
                  >
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

            <Box sx={{ display: "flex" }} key={index}>
              <IconButton variant="plain" color="neutral" size="sm" onClick={()=>{handleLike(item._id)}}>
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
              <IconButton
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ padding: "14px" }}
              >
                <ICONS.Share />
              </IconButton>
            </Box>
            <Box>
              <Typography textAlign={"left"}>{y} likes</Typography>

              {showTextField ? (
                <form onSubmit={handleSubmit}>
                  <textarea
                    style={{ width: "260px", height: "80px" }}
                    value={item.caption}
                    onChange={handleCommentChange}
                  />
                  <button type="submit">Update Comment</button>
                </form>
              ) : (
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
              )}
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
