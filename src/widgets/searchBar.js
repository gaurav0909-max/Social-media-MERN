
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { DRAWER_WIDTH } from "../consts/constants";
import { Avatar, Card, IconButton, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../Api";
import { ICONS } from "../Assets/Icons";
import { BASE_URL } from "../Api/client";

export default function Search() {
    const [searchTerm, setsearchTerm] = useState("");
    const navigate = useNavigate();
    const Ipad = useMediaQuery('(min-width:900px)');

    const [results, setResults] = useState()

    const handleChange = async (searchTerm) => {
        const Data = await api.search.get(searchTerm)
        setResults(Data.data.users)
    }

    return (
        <div
            style={{
                display: "flex",
                alignSelf: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: 20,
            }}
        >

            <form name="search-form">
                <TextField
                    id="search-bar"
                    className="text"
                    onChange={(e) => {
                        setsearchTerm(e.target.value);
                    }}
                    label="Enter a userName"
                    variant="outlined"
                    placeholder="Search..."
                    size="medium"
                />

                <IconButton onClick={() => handleChange(`searchTerm=${searchTerm}`)}>
                    <ICONS.Search />
                </IconButton>

            </form>

            <div style={{ padding: 3 }}>

                {results?.map((data, index) => {
                    return <Card
                        className="text"
                        sx={{
                            padding: 3,
                            fontSize: 30,
                            color: "darksalmon",
                            margin: 1,
                            width: Ipad ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
                            ml: Ipad ? `${DRAWER_WIDTH}px` : null,
                            display: 'flex',
                            flexDirection: Ipad ? "row" : "column",
                            alignItems: 'center',
                            gap: 10
                        }}
                        key={index}
                        onClick={() => navigate(`/${data.userName}`)}
                    >
                        <Avatar
                            src={BASE_URL + data.profileImage}
                            sx={{ border: '2px solid', height: '70px', width: '70px' }}
                        />
                        <div>
                            <Typography variant="h4" >
                                {data.userName}
                                <Typography variant="subtitle1">
                                    {data.fullName}
                                </Typography>
                            </Typography>
                        </div>

                    </Card>
                }
                )}

            </div>

        </div>
    );
}