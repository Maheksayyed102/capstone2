import { AppBar, Toolbar, Button } from "@mui/material";
import { NavLink } from "react-router-dom";


export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={NavLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={NavLink} to="/my-quizzes">
          My Quiz
        </Button>
        <Button color="inherit" component={NavLink} to="/play">
          Play Quiz
        </Button>
      </Toolbar>
    </AppBar>
  );
}
