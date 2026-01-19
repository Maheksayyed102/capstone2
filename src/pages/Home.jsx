import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3} padding={5}>
      {[
        { title: "Create New Quiz", path: "/create" },
        { title: "My Quizzes", path: "/my-quizzes" },
        { title: "Play Quiz", path: "/play" },
      ].map((item) => (
        <Grid item xs={12} md={4} key={item.title}>
          <Card onClick={() => navigate(item.path)} sx={{ cursor: "pointer" }}>
            <CardContent>
              <Typography variant="h6">{item.title}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}