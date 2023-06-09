import { Routes, Route } from 'react-router-dom';
import Category from '../containers/pages/Category';
import Error404 from '../containers/pages/Error404'
import { Grid, useMediaQuery } from '@mui/material';
import ProfilePage from '../containers/pages/ProfilePage';
import UserPost from '../widgets/UserPost';
import { Avatars } from '../utils/allAvatars';
import { Avatars1 } from '../utils/allAvatars';
import { Avatars2 } from '../utils/allAvatars';
import InstagramPost from '../widgets/InstagramPost';
import DrawerElement from '../containers/pages/drawer';
import Login from '../containers/pages/login';
import SignUp from '../containers/pages/signUp';
import UploadPost from '../containers/pages/UploadPost';
import Search from '../widgets/searchBar';
import CustomizeProfile from '../containers/pages/CustomizeProfile'
import OthersPost from '../widgets/OthersPost';
import LabelBottomNavigation from '../containers/pages/BottomNavigation';
import FixedBottomNavigation from '../containers/pages/BottomNavigation';

const drawerWidth = 240;

const Routing = () => {
    const Ipad = useMediaQuery('(min-width:900px)');
    return (

        <Routes>
            <Route path="*" element={<Error404 />} />
            <Route path="/" element={<Login />} />
            <Route path="/Logout" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/home" element={
                <>
                    <Grid container columns={18} sx={{
                        width: Ipad ? `calc(100% - ${drawerWidth}px)` :"100%",
                        ml: Ipad ? `${drawerWidth}px` :null ,
                        mt: '20px',
                    }}>
                        <Grid item md={9} lg={6}>
                            {Avatars?.map(({ id, img }) => <InstagramPost key={id} {...{ id, img }} />)}
                        </Grid>
                        <Grid item md={9} lg={6}>
                            {Avatars1?.map(({ id, img }) => <InstagramPost key={id} {...{ id, img }} />)}
                        </Grid>
                        <Grid item md={9} lg={6}>
                            {Avatars2?.map(({ id, img }) => <InstagramPost key={id} {...{ id, img }} />)}
                        </Grid>
                    </Grid>
                    <DrawerElement />
                    <FixedBottomNavigation/>
                </>
            } />
            <Route path="/category" element={
                <>
                    <DrawerElement />
                    <Category />
                    <FixedBottomNavigation/>
                </>
            } />
            <Route path="/upload" element={
                <>
                    <DrawerElement />
                    <UploadPost />
                    <FixedBottomNavigation/>
                </>
            } />
            <Route path='/Profile' element={
                <>
                    <DrawerElement />
                    <ProfilePage />
                    <FixedBottomNavigation/>
                </>
            } />
            <Route path='/search/' element={
                <>
                    <DrawerElement />
                    <Search />
                    <FixedBottomNavigation/>
                </>


            } />
            <Route path='/:userName' element={
                <>
                    <DrawerElement />
                    < CustomizeProfile />
                  
                    <FixedBottomNavigation/>
                    {/* <UserPost /> */}
                </>

            } />
            
        </Routes>

    )
}

export default Routing
