import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import homeIcon from "../images/home.png";
import quizIcon from "../images/quiz.png";
import playIcon from "../images/play.png";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>

        <Button
          color="inherit"
          component={NavLink}
          to="/"
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center"
          }}
        >
          <Box
            component="img"
            src={homeIcon}
            alt="home"
            sx={{ width: 20, height: 20 }}
          />
          Home
        </Button>

        <Button
          color="inherit"
          component={NavLink}
          to="/my-quizzes"
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center"
          }}
        >
          <Box
            component="img"
            src={quizIcon}
            alt="my-quiz"
            sx={{ width: 20, height: 20 }}
          />
          My Quiz
        </Button>

        <Button
          color="inherit"
          component={NavLink}
          to="/play"
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center"
          }}
        >
          <Box
            component="img"
            src={playIcon}
            alt="my-play"
            sx={{ width: 20, height: 20 }}
          />
          Play Quiz
        </Button>

      </Toolbar>
    </AppBar>
  );
}
