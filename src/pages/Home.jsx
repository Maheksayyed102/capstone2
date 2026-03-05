import { Card, CardContent, Grid, Typography, Box, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import createImg from "../images/icon-create.jpg";
import myQuiz from "../images/icon-quiz.webp";
import addImg from "../images/add-create.png";
import addQuiz from "../images/add-quiz.png";
import playQuiz from "../images/icon-play.jpg";
import addPlay from "../images/add-play.png";

export default function Home() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Create New Quiz",
      path: "/create",
      image: createImg,
      hover: addImg,
    },
    {
      title: "My Quizzes",
      path: "/my-quizzes",
      image: myQuiz,
      hover: addQuiz,
    },
    {
      title: "Play Quiz",
      path: "/play",
      image: playQuiz,
      hover: addPlay,
    },
  ];

  return (
    <Grid container spacing={3} padding={5} justifyContent="center">
      {cards.map((item) => (
        <Grid item xs={12} md={4} key={item.title}>
          <Tooltip title={`Click to continue ${item.title}`} arrow placement="top">
            <Card
              onClick={() => navigate(item.path)}
              sx={{
                height: 240,
                width: 240,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 3,
                transition: "0.3s",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",

                backgroundImage: `
                  linear-gradient(rgba(20,9,6,0.2), rgba(20,6,9,0.2)),
                  url(${item.image})
                `,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",

                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  backdropFilter: "blur(2px)",
                  WebkitBackdropFilter: "blur(2px)",
                  opacity: 0,
                  transition: "0.3s",
                },

                "&:hover::before": {
                  opacity: 1,
                },

                "&:hover": {
                  transform: "scale(1.05)",
                },

                "&:hover .card-text": {
                  opacity: 0,
                },

                "&:hover .hover-img": {
                  opacity: 1,
                  transform: "translate(-50%, -50%) scale(1)",
                },
              }}
            >
              <CardContent sx={{ position: "relative", zIndex: 2 }}>
                <Typography
                  variant="h6"
                  className="card-text"
                  sx={{
                    transition: "0.3s",
                    fontWeight: 900,
                    color: "black",
                  }}
                >
                  {item.title}
                </Typography>
              </CardContent>

              {item.hover && (
                <Box
                  component="img"
                  src={item.hover}
                  className="hover-img"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    height: "70px",
                    width: "70px",
                    opacity: 0,
                    transition: "0.4s",
                    transform: "translate(-50%, -50%) scale(0.8)",
                    zIndex: 3,
                    filter: "drop-shadow(0px 15px 20px rgba(0,0,0,0.6))",
                  }}
                />
              )}
            </Card>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
}