import React, { useState } from 'react'
import { Button, Card, CardContent, CardHeader, InputAdornment, TextField, useMediaQuery } from '@mui/material'
import { AspectRatio } from '@mui/joy';

import KeyboardAltIcon from '@mui/icons-material/KeyboardAlt';
function UploadPost() {
  const drawerWidth = 240;
  const Ipad = useMediaQuery('(min-width:900px)');
  const [file, setFile] = useState('');
  const imageHandler = (e) => {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = (e) => {
    console.log("hello")
  }
  return (


    <Card sx={{
      width: Ipad ? `calc(100% - ${drawerWidth}px)` : '100%',
      ml: Ipad ? `${drawerWidth}px` : null,
      mt: 10,
      alignContent: 'center',
      border: "1px solid black",
      backgroundColor: '#ee9ca7'
    }}>
      <CardHeader title="Upload Post" />
      <CardContent>
        <div className="uploadImage">
          <input type='file' name="image" accept="image/*" multiple={false} onChange={imageHandler} />

        </div>
        <AspectRatio objectFit="contain" sx={{ m: 5, borderRadius: '30px' }}>
          <img src={file} alt='Upload your files here' />
        </AspectRatio>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Caption"
          type="caption"
          placeholder=' “Life is a journey, not a destination.”- Anonymous'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <KeyboardAltIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          variant="outlined"
        />
        <Button type='submit' variant='contained' onClick={handleSubmit} sx={{ m: 3 }} >Submit</Button>
      </CardContent>
    </Card>




  )
}

export default UploadPost
