
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { DRAWER_WIDTH } from "../consts/constants";
import { Avatar, Card, Typography, useMediaQuery } from "@mui/material";
import { data } from "../consts/constants";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ setSearchQuery }) => (
    <form name="search-form">
        <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
                setSearchQuery(e.target.value);
            }}
            label="Enter a userName"
            variant="outlined"
            placeholder="Search..."
            size="small"
        />
    </form>
);

const filterData = (query, data) => {
    if (!query) {
        return data;
    } else {
        return data
            .filter((d) => d.userName.toLowerCase().includes(query) || d.fullName.toLowerCase().includes(query));
    }
};

export default function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const dataFiltered = filterData(searchQuery, data);
    const Ipad = useMediaQuery('(min-width:900px)');
    

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
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div style={{ padding: 3 }}>
                {dataFiltered?.map((d) => {
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
                        key={d.id}
                        onClick={() => navigate(`/${d.userName}`)}
                    >
                        <Avatar

                            src={d.img}
                            sx={{ border: '2px solid', height: '70px', width: '70px' }}
                        />
                        <div>
                            <Typography variant="h4" >
                                {d.userName}
                                <Typography variant="subtitle1">
                                    {d.fullName}
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