import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../images/main-bg.jpg";

const quizRules = {
  title: "Quiz Rules",
  rules: [
    "Each question carries one mark.",
    "Do not refresh the page during the quiz.",
    "You cannot go back to previous questions once answered.",
    "Make sure you have a stable internet connection.",
    "Read each question carefully before answering.",
    "Try to complete the quiz within the given time (if applicable).",
    "Do not cheat or use any external help."
  ],
  startButtonText: "Start Quiz",
  targetPage: "/play-quiz"
};

export default function QuizRules() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleStartClick = () => setOpenDialog(true);

  const handleConfirm = () => {
    setOpenDialog(false);
    navigate(quizRules.targetPage);
  };

  const handleCancel = () => setOpenDialog(false);

  return (
    <Box
      sx={{
        height: "90.8vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflowY: "hidden"
      }}
    >
      <Box
        sx={{
          mt: "50px",
          position: "relative",
          maxWidth: 650,
          maxHeight: 550,
          bgcolor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          p: 5,
          boxShadow: "0 8px 25px rgba(0,0,0,0.7)",
          textAlign: "left",
          overflowY: "auto"
        }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          textAlign="center"
          sx={{
            color: "#fff",
            mb: 4,
            textShadow: "3px 3px 10px rgba(0,0,0,0.7)"
          }}
        >
          {quizRules.title}
        </Typography>

        <List>
          {quizRules.rules.map((rule, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: "#4caf50" }} />
              </ListItemIcon>
              <ListItemText
                primary={rule}
                primaryTypographyProps={{
                  sx: { color: "#fff", fontSize: "1.15rem" }
                }}
              />
            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{
            mt: 4,
            py: 1.8,
            fontSize: "1.2rem",
            borderRadius: 3,
            background: "linear-gradient(45deg, #FF6B6B, #FFD93D)",
            color: "#fff",
            fontWeight: "bold",
            boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
            }
          }}
          onClick={handleStartClick}
        >
          {quizRules.startButtonText}
        </Button>

        <Dialog open={openDialog} onClose={handleCancel} disableScrollLock>
          <DialogTitle>Start Quiz</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ fontSize: "1.1rem" }}>
              Are you ready to start the quiz? Make sure you're prepared!
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleConfirm} variant="contained" color="primary">
              Yes
            </Button>
            <Button onClick={handleCancel} variant="outlined" color="secondary">
              No
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}