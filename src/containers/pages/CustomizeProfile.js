import {
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Skeleton,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRef } from "react";
import { DRAWER_WIDTH } from "../../consts/constants";
import { Avatar } from "@mui/joy";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { api } from "../../Api";
import { ICONS } from "../../Assets/Icons";
import OthersPost from "../../widgets/OthersPost";

function CustomizeProfile() {
  const [count, setCount] = useState(0);
  const [followers, setfollowers] = useState();
  const [followings, setfollowings] = useState();
  const [showfollowers, setshowfollowers] = useState([]);
  const [showfollowings, setshowfollowings] = useState([]);
  const [start, setStart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState(false);
  const Ipad = useMediaQuery("(min-width:900px)");
  const windowWidth = useRef(window.innerWidth);
  const location = useLocation();
  const { userName, bio, profileImage, fullName, id } = location.state;

  const followAPI = async () => {
    const follow = await api.follow.post(id);

    console.log(follow.data);
    handleAPI();
    window.location.reload();
  };

  const unfollowAPI = async () => {
    const unfollow = await api.unfollow.post(id);
    console.log(unfollow.data);
    handleAPI();
    window.location.reload();
  };

  const handleAPI = async () => {
    const followers = await api.followers.get(id);
    setshowfollowers(followers.data.data.followers);
    setfollowers(followers.data.data.followers.length);

    const followings = await api.following.get(id);
    setshowfollowings(followings.data.data.following);
    setfollowings(followings.data.data.following.length);

    const PostCount = await api.myPost.getByName(userName);
    setCount(PostCount.data.data.posts.length);
    setLoading(false);
  };

  useEffect(() => {
    handleAPI();
  }, [userName]);
  
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
  const dialogWidth = 500;

  return (
    <div>
      <Card
        elevation={8}
        circle="true"
        sx={{
          display: "flex",
          justifyContent: "center",
          md: { justifyContent: "center" },
          width: Ipad
            ? `calc(100% - ${DRAWER_WIDTH}px)`
            : windowWidth.innerWidth,
          ml: Ipad ? `${DRAWER_WIDTH}px` : null,
          mt: "10px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", marginTop: 20 }}
        >
          <Avatar
            display="none"
            src={profileImage}
            sx={{ width: "100px", height: "100px", borderRadius: "70px" }}
          />
          <Typography variant="overline">{fullName}</Typography>
        </div>

        <CardContent sx={{ display: { xs: "none", md: "block" } }}>
          <Typography gutterBottom variant="h5" component="div">
            USER PROFILE
          </Typography>

          <Typography variant="h4" color="text.secondary">
            {/* {localStorage.getItem('data.email').split('@')[0].toUpperCase()} */}
            {userName}
            {/* {localStorage.getItem('token')} */}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              gap: "20px",
            }}
          >
            <div>
              {loading ? (
                <Skeleton variant="text" width={60} height={50} />
              ) : (
                <Typography>{count}</Typography>
              )}
              <Button
                variant="text"
                style={{
                  color: "#ff0080",
                }}
              >
                Posts
              </Button>
            </div>
            <div>
              {loading ? (
                <Skeleton variant="text" width={100} height={50} />
              ) : (
                <Typography>{followers}</Typography>
              )}
              <Button
                variant="text"
                style={{
                  color: "#ff0080",
                }}
                onClick={handleClickStart}
              >
                Followers
              </Button>
            </div>
            <div>
              {loading ? (
                <Skeleton variant="text" width={100} height={50} />
              ) : (
                <Typography>{followings}</Typography>
              )}
              <Button
                variant="text"
                style={{
                  color: "#ff0080",
                }}
                onClick={handleClickInitial}
              >
                Following
              </Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: "#ff0080" }}
              onClick={() => {
                followAPI();
              }}
            >
              Follow
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#ff0080" }}
              onClick={() => {
                unfollowAPI();
              }}
            >
              Unfollow
            </Button>
          </div>
          {/* <ButtonGroup variant="outlined" sx={{ gap: "20px" , m:2}}>
                          <Button>Posts</Button>
                          <Button >Follwers</Button>
                          <Button>Following</Button>     
                       </ButtonGroup> */}

          <Typography sx={{ p: 1 }}>{bio}</Typography>
          {/* <Typography sx={{p:1}}>
                      My hobbies are Travelling and Photography...
                      </Typography>
                      <Typography sx={{p:1}}>
                      here is my some of memories that defines my life.
                      </Typography> */}
        </CardContent>

        <Dialog
          open={start}
          onClose={handleOff}
          circle={true}
          PaperProps={{ style: { width: dialogWidth } }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <DialogTitle color="#FF0080">Followers</DialogTitle>
            <Button onClick={handleOff} style={{ backgroundColor: "#ff0080" }}>
              <ICONS.Cross sx={{ color: "white" }} />
            </Button>
          </div>
          <Divider />
          <DialogContent>
            {showfollowers.map((item, index) => (
              <Card
                sx={{ display: "flex", flexDirection: "row", gap: 7 }}
                key={index}
              >
                <Avatar
                  src={item.profileImage}
                  sx={{ height: "70px", width: "70px" }}
                />
                <Typography variant="h5" textColor="#FF0080">
                  {item.userName}
                </Typography>
              </Card>
            ))}
          </DialogContent>
        </Dialog>

        <Dialog
          open={initial}
          onClose={handleEnd}
          circle={true}
          PaperProps={{ style: { width: dialogWidth } }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <DialogTitle color="#FF0080">Followings</DialogTitle>
            <Button onClick={handleEnd} style={{ backgroundColor: "#ff0080" }}>
              <ICONS.Cross sx={{ color: "white" }} />
            </Button>
          </div>
          <Divider />
          <DialogContent>
            {showfollowings.map((item, index) => (
              <Card
                fullwidth
                sx={{ display: "flex", flexDirection: "row", gap: 7 }}
                key={index}
              >
                <Avatar
                  src={item.profileImage}
                  sx={{ height: "70px", width: "70px" }}
                />
                <Typography variant="h5" textColor="#FF0080">
                  {item.userName}
                </Typography>
              </Card>
            ))}
          </DialogContent>
        </Dialog>
      </Card>
      <OthersPost />
    </div>
  );
}

export default CustomizeProfile;
