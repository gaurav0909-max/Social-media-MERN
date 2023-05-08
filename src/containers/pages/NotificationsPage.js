import React from 'react'
import { Avatar, Card, Grid, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import { DRAWER_WIDTH } from '../../consts/constants';
import { NotificationList } from '../../consts/constants';
function NotificationsPage() {

  const Ipad = useMediaQuery('(min-width:900px)');
  return (

    <Grid sx={{
      width: Ipad ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%', height: '700px',
      ml: Ipad ? `${DRAWER_WIDTH}px` : null,
      mt: '20px'
    }} >
      {NotificationList?.map((data, index) => (
        <Card sx={{ display: 'flex', mt: 4, boxShadow: 4 }} key={index}>
          <Avatar
            size="sm"
            src={data.img}
            sx={{ border: '2px solid', height: '70px', width: '70px', ml: '20px' }}
          />
          <div>
            <Typography align='center' variant='h3' sx={{ paddingLeft: 5 }}>
              {data.title}
            </Typography>
            <Typography variant='h6'>
              {data.time}
            </Typography>
          </div>
        </Card>
      ))
      }

    </Grid>

  )
}

export default NotificationsPage


