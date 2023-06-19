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
  useMediaQuery,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { ICONS } from "../Assets/Icons";
import { fetchProfileById } from "../redux/reducers/userProfileSlice";
import { formateDate } from "../utils/helpers/formateDate";
import { api } from "../Api";

export default function UserPost({ user }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [selectedPostId, setSelectedPostId] = React.useState(null);
  const [editPostId, seteditPostId] = React.useState(null);
  const [showTextField, setShowTextField] = useState(false);
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const [myPost, setmyPost] = useState([]);
  const [data, updatedata] = useState([]);
  const [allcomments, setAllcomments] = useState([]);
  const [open, setOpen] = useState(false);
  const drawerWidth = 240;
  const Ipad = useMediaQuery("(min-width:900px)");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleOpenUserMenu = (event, id) => {
    setAnchorElUser(event.currentTarget);
    setShowTextField(false)
    setSelectedPostId(id);
    seteditPostId(id)
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleEdit = async (id) => {
    try {
      setShowTextField(true);
    } catch {
      setShowTextField(false);
    }
  };

  
  const handleDelete = async (id) => {
    console.log(id);
    const details = await api.myPost.delete(id);
    await window.location.reload();
    console.log(details);
  };

  const handleLike = async (id) => {
    const likes = await api.like.post(id);
    await window.location.reload();
    console.log("likes", likes.data.message);
  };
  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleSubmit = (e,id,) => {
    e.preventDefault();
    console.log("Updated comment:", caption);
    const editedPost = api.myPost.edit(id)
    console.log(editedPost)
    setShowTextField(false);
  };

  const handlePost = async () => {
    const post = await api.myPost.getByName(user);
    console.log('post', post.data.data.posts)
    setmyPost(post.data.data.posts);
  };

  useEffect(() => {
    dispatch(fetchProfileById()).then(
      (response) => {
        updatedata(response.payload.data.data.user);
      },
      handlePost(),
      handleCommentApi()
    );
  }, [dispatch, user]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCommentApi = async (id) => {
    try {
      setAllcomments([])
      const info = await api.Comment.get(id);
      console.log(info.data.data);
      setAllcomments(info.data.data.comments);
    } catch {
       setAllcomments([]);
    }
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
                <IconButton
                  onClick={(e) => handleOpenUserMenu(e, item._id)}
                  variant="plain"
                  color="neutral"
                  size="sm"
                  sx={{ ml: "auto" }}
                >
                  <ICONS.Dots />
                </IconButton>
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
                      handleEdit(selectedPostId);
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
                      handleDelete(selectedPostId);
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
              <IconButton
                variant="plain"
                color="neutral"
                size="sm"
                onClick={() => {
                  handleLike(item._id);
                }}
              >
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
                onClick={() => {
                  handleClickOpen(item._id);
                  handleCommentApi(item._id);
                }}
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
              <Typography textAlign={"left"}>{item.likes} likes</Typography>

              {showTextField  && editPostId===item._id ? (
                <form >
                  <textarea
                    style={{ width: "260px", height: "80px" }}
                    value={caption}
                    name="caption"
                    onChange={handleCaptionChange}
                  />
                  <button type="submit" onClick={(e)=>{handleSubmit(e,selectedPostId)}}>Update Comment</button>
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
          
          {allcomments.map((item, index) => (
            <Card
              sx={{ display: "flex", flexDirection: "row", gap: 7 }}
              key={index}
            >
              <Avatar
                src={item.user.profileImage}
                sx={{ height: "70px", width: "70px" }}
              />
              <div>
                <Typography variant="h5" textColor="#FF0080">
                  {item.user.fullName}
                </Typography>
                <Typography variant="subtitle1">{item.content}</Typography>
              </div>
            </Card>
          ))}
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
