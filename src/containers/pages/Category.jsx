import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const drawerWidth = 230;

export default function Category() {
  const [type, Settype] = useState("");

  const handleFruit = (e) => {
    Settype("Fruit");
  };
  const handleAnimal = (e) => {
    Settype("Animal");
  };
  const handleNature = (e) => {
    Settype("Nature");
  };
  const handleShop = (e) => {
    Settype("Shop");
  };

  function handleFeedback() {
    alert("Thanks for feedback!");
  }

  const Ipad = useMediaQuery("( min-width:900px)");
  return (
    <div>
      <Grid
        container
        columns={12}
        sx={{
          width: Ipad ? `calc(100% - ${drawerWidth}px)` : "100%",
          ml: Ipad ? `${drawerWidth}px` : null,
          mt: "20px",
        }}
      >
        <Grid item={true} md={6} lg={3}>
          <Button
            variant="outlined"
            style={{
              color: "#ff0080",
              borderColor: "#ff0080",
            }}
            value="Animal"
            onClick={(e) => handleFruit()}
          >
            Fruit
          </Button>
        </Grid>
        <Grid
          item={true}
          md={6}
          lg={3}
          value="Animal"
          onClick={(e) => handleAnimal()}
        >
          <Button
            variant="outlined"
            style={{
              color: "#ff0080",
              borderColor: "#ff0080",
            }}
          >
            Animal
          </Button>
        </Grid>
        <Grid
          item={true}
          md={6}
          lg={3}
          value="Animal"
          onClick={(e) => handleNature()}
        >
          <Button
            variant="outlined"
            style={{
              color: "#ff0080",
              borderColor: "#ff0080",
            }}
          >
            Nature
          </Button>
        </Grid>
        <Grid
          item={true}
          md={6}
          lg={3}
          value="Animal"
          onClick={(e) => handleShop()}
        >
          <Button
            variant="outlined"
            style={{
              color: "#ff0080",
              borderColor: "#ff0080",
            }}
          >
            Shop
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        columns={12}
        sx={{
          width: Ipad ? `calc(100% - ${drawerWidth}px)` : "100%",
          gridGap: "10px",
          ml: Ipad ? `${drawerWidth}px` : null,
          mt: "20px",
        }}
      >
        {type === ""
          ? CategoryItems.map((data, index) => (
              <Card
                sx={{
                  width: Ipad ? `calc(100% - ${drawerWidth}px)` : "100%",
                  maxWidth: 345,
                }}
                key={index}
              >
                <CardMedia sx={{ height: 400 }} image={data.img} />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    color="#ff0080"
                  >
                    {data.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.details}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="outlined"
                    style={{
                      color: "#ff0080",
                      borderColor: "#ff0080",
                    }}
                    onClick={handleFeedback}
                  >
                    Nice
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    style={{
                      color: "#ff0080",
                      borderColor: "#ff0080",
                    }}
                    onClick={handleFeedback}
                  >
                    Not bad
                  </Button>
                </CardActions>
              </Card>
            ))
          : CategoryItems.filter((item) => item.category === type).map(
              (data, index) => (
                <Card
                  sx={{
                    width: Ipad ? `calc(100% - ${drawerWidth}px)` : "100%",
                    maxWidth: 345,
                    
                  }}
                  key={index}
                >
                  <CardMedia sx={{ height: 400 }} image={data.img} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {data.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.details}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="outlined"
                      style={{
                        color: "#ff0080",
                        borderColor: "#ff0080",
                      }}
                      onClick={handleFeedback}
                    >
                      Nice
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      style={{
                        color: "#ff0080",
                        borderColor: "#ff0080",
                      }}
                      onClick={handleFeedback}
                    >
                      Not bad
                    </Button>
                  </CardActions>
                </Card>
              )
            )}
      </Grid>
    </div>
  );
}

const CategoryItems = [
  {
    id: 1,
    label: "Dog",
    category: "Animal",
    details: "dog is a honest animal",
    img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  },
  {
    id: 2,
    label: "Cat",
    category: "Animal",
    details: "cat is a honest animal",
    img: "https://images.unsplash.com/photo-1583795128727-6ec3642408f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2F0c3xlbnwwfHwwfHw%3D&w=1000&q=80",
  },
  {
    id: 3,
    label: "Cow",
    category: "Animal",
    details: "cow is a honest animal",
    img: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
  },
  {
    id: 4,
    label: "Shirts",
    category: "Shop",
    details:
      "A shirt with a collar, sleeves, and buttons",
    img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 5,
    label: "Watch",
    category: "Shop",
    details: "A limited-edition piece for you. #watches",
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80",
  },
  {
    id: 6,
    label: "Grocery",
    category: "Shop",
    details:
      "Grocery shopping can be a messy affair",
    img: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 13,
    label: "Lion",
    category: "Animal",
    details: "Lonely lion is better than famous sheep.",
    img: "https://images.unsplash.com/photo-1562569633-622303bafef5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 7,
    label: "Mountain",
    category: "Nature",
    details: "The mountains are calling, and I must go!",
    img: "https://images.unsplash.com/photo-1664966502220-7a767e8b23e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 8,
    label: "Grapes",
    category: "Fruit",
    details: "Escape junk food and switch to grapes.",
    img: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
  },
  {
    id: 9,
    label: "Ananas",
    category: "Fruit",
    details: "Escape junk food and switch to grapes.",
    img: "https://images.unsplash.com/photo-1490885578174-acda8905c2c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
  },
  {
    id: 10,
    label: "Waterfall",
    category: "Nature",
    details: "The sound of a waterfall is nature's lullaby.",
    img: "https://images.unsplash.com/photo-1546882588-d9bd63f85a7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 11,
    label: "Watermalon",
    category: "Fruit",
    details:
      "I need a bite of watermelon every minute.",
    img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  },
  {
    id: 12,
    label: "Ocean with Sun",
    category: "Nature",
    details: "Live in the sunshine, swim the sea",
    img: "https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80",
  },
];
