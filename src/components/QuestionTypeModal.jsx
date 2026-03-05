import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  Button,
  Typography,
  Box
} from "@mui/material";

export default function QuestionTypeModal({
  open = false,
  value = "",
  onSelect,
  onClose
}) {

  const [internalOpen, setInternalOpen] = useState(open);

  useEffect(() => {
    setInternalOpen(open);
  }, [open]);

  const handleClose = () => {
    setInternalOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleSelect = (selectedValue) => {
    if (onSelect) {
      onSelect(selectedValue);
    }
    handleClose();
  };

  return (
    <Dialog
      open={internalOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 2,
          minWidth: 350
        }
      }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: 700 }}>
        Select Question Type
      </DialogTitle>

      <DialogContent>
        <Typography
          variant="body2"
          sx={{ textAlign: "center", mb: 2 }}
        >
          Choose the type of question you want to add
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          
          <Box
            onClick={() => handleSelect("single")}
            sx={{
              border: value === "single"
                ? "2px solid #1976d2"
                : "1px solid #ccc",
              borderRadius: 2,
              p: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer"
            }}
          >
            <Radio checked={value === "single"} />
            <Typography>MCQ (Single Correct)</Typography>
          </Box>

          <Box
            onClick={() => handleSelect("multi")}
            sx={{
              border: value === "multi"
                ? "2px solid #1976d2"
                : "1px solid #ccc",
              borderRadius: 2,
              p: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer"
            }}
          >
            <Radio checked={value === "multi"} />
            <Typography>MCQ (Multiple Correct)</Typography>
          </Box>

        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          variant="outlined"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}