import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  InputAdornment,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { AspectRatio } from "@mui/joy";
import { api } from "../../Api";
import KeyboardAltIcon from "@mui/icons-material/KeyboardAlt";

function UploadPost() {
  const drawerWidth = 240;
  const Ipad = useMediaQuery("(min-width:900px)");
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");

  const imageHandler = async (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
    await localStorage.setItem(
      "postImage",
      URL.createObjectURL(e.target.files[0])
    );
  };

  const handleSubmit = async () => {
    const formdata = new FormData();
    formdata.append("postImage", file);
    formdata.append("caption", caption);
    console.log("formdata", file);
    const Data = await api.myPost.post(formdata);
    console.log(Data.data);
  };

  return (
    <Card
      sx={{
        width: Ipad ? `calc(100% - ${drawerWidth}px)` : "100%",
        ml: Ipad ? `${drawerWidth}px` : null,
        mt: 7,
        alignContent: "center",
        border: "1px solid black",
        backgroundColor: "#ed689e",
      }}
    >
      <CardHeader title="Upload Post" />
      <CardContent>
        <div className="uploadImage">
          <input
            type="file"
            id="name"
            name="postImage"
            accept="image/*"
            onChange={imageHandler}
          />
        </div>
        <AspectRatio objectFit="contain" sx={{ borderRadius: "30px" }}>
          <img
            src={localStorage.getItem("postImage")}
            alt="Upload your files here"
          />
        </AspectRatio>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="caption"
          label="Caption"
          type="caption"
          onChange={(e) => setCaption(e.target.value)}
          required
          placeholder=" “Life is a journey, not a destination.”- Anonymous"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyboardAltIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          sx={{ m: 3 }}
        >
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}

export default UploadPost;
