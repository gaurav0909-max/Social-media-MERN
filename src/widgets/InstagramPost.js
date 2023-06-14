/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { ICONS } from "../Assets/Icons";
import { fetchProfileById } from "../redux/reducers/userProfileSlice";
import { useDispatch } from "react-redux";

export default function InstagramPost({ id, img }) {
  const [commentValue, setCommentValue] = useState("");
  const [value, setvalue] = useState("");
  const [data, updatedata] = useState("");
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleChange = (e) => {
    setvalue("");
    setCommentValue(e.target.value);
  };

  const handleValue = () => {
    setvalue(commentValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    dispatch(fetchProfileById()).then((response) => {
      updatedata(response.payload.data);
    });
  }, [dispatch]);
  
  // console.log(data.data.user.userName)
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 250,
        marginBottom: "7px",
        marginRight: "7px"
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", margin:'10px' }}>
        <Box
          sx={{
            position: "relative",
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              m: "-2px",
              borderRadius: "50%",
              background:
                "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 70%)",
            },
          }}
        >
          <Avatar
            size="sm"
            src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
            sx={{ p: 0.5, borderColor: "background.body" }}
          />
        </Box>
        <Typography fontWeight="lg"  sx={{padding:'7px'}}>Instagram</Typography>
        <IconButton
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ ml: "auto" }}
        >
          <ICONS.Dots />
        </IconButton>
      </Box>

      <CardOverflow>
        <AspectRatio key={id}>
          <img src={img} alt="" loading="lazy" />
        </AspectRatio>
      </CardOverflow>

      <Box sx={{ display: "flex", alignItems: "center", mx: -1, my: 1 }}>
        <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
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
      </Box>
      <Link
        component="button"
        underline="none"
        fontSize="sm"
        fontWeight="lg"
        textColor="text.primary"
      >
        5.1M Likes
      </Link>
      <Link
        component="button"
        underline="none"
        fontSize="sm"
        startDecorator="…"
        sx={{ color: "text.tertiary" }}
      >
        more
      </Link>
      <Link
        component="button"
        underline="none"
        fontSize="7px"
        sx={{ color: "text.tertiary", my: 0.5 }}
      >
        2 DAYS AGO
      </Link>
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
              {data.data?.user?.userName}
              </Typography>
              <Typography variant="subtitle1">{value}</Typography>
            </div>
          </Card>
        </DialogContent>
        <DialogActions>
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
        </DialogActions>
      </Dialog>
    </Card>
  );
}
