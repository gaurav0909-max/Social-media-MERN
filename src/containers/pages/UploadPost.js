import React, { useState } from 'react'
import { Button, Card, CardContent, Grid,CardHeader, useMediaQuery} from '@mui/material'
import { AspectRatio } from '@mui/joy';




function UploadPost() {
    const drawerWidth= 240;
    const Ipad = useMediaQuery('(min-width:900px)');
    const [file,setFile]=useState('');
    const imageHandler = (e)=>{
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
  return (
    <Grid container sx={{
        width: Ipad ? `calc(100% - ${drawerWidth}px)` : '100%',
        ml: Ipad ? `${drawerWidth}px` : null,
       
    }}>

<Card>
    <CardHeader title="Upload Post"/>
<CardContent>
      <div className="uploadImage">
<input type='file' name="image" accept="image/*" multiple={false} onChange={imageHandler} />
<Button sx={{mt:'10px'}}>Add Images</Button>

</div>
<AspectRatio objectFit="contain" >
<img src={file} alt='Upload your files here'height={200} width={200}/>
</AspectRatio>

</CardContent>
</Card>


</Grid>

  )
}

export default UploadPost
