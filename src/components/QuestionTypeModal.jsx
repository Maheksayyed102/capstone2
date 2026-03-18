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

  // ✅ handle close with reason (IMPORTANT)
  const handleClose = (event, reason) => {

    // ❗ if no type selected → block closing + show alert
    if (!value) {
      alert("Please select an option");
      return;
    }

    if (onClose) onClose(event, reason);
  };

  // ✅ send type + limits
  const handleSelect = (selectedValue) => {

    let config = {
      type: selectedValue,
      limit: null,
      limitType: null
    };

    if (selectedValue === "short") {
      config.limit = 30;
      config.limitType = "characters";
    }

    if (selectedValue === "descriptive") {
      config.limit = 200;
      config.limitType = "words";
    }

    if (onSelect) {
      onSelect(config);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}   // ✅ important
      disableEscapeKeyDown   // ✅ block ESC auto close
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

          {/* Single */}
          <Box
            onClick={() => handleSelect("single")}
            sx={{
              border: value === "single" ? "2px solid #1976d2" : "1px solid #ccc",
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

          {/* Multi */}
          <Box
            onClick={() => handleSelect("multi")}
            sx={{
              border: value === "multi" ? "2px solid #1976d2" : "1px solid #ccc",
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

          {/* Short */}
          <Box
            onClick={() => handleSelect("short")}
            sx={{
              border: value === "short" ? "2px solid #1976d2" : "1px solid #ccc",
              borderRadius: 2,
              p: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer"
            }}
          >
            <Radio checked={value === "short"} />
            <Typography>Short Answer (Max 30 characters)</Typography>
          </Box>

          {/* Descriptive */}
          <Box
            onClick={() => handleSelect("descriptive")}
            sx={{
              border: value === "descriptive" ? "2px solid #1976d2" : "1px solid #ccc",
              borderRadius: 2,
              p: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer"
            }}
          >
            <Radio checked={value === "descriptive"} />
            <Typography>Descriptive Answer (Max 200 words)</Typography>
          </Box>

        </Box>

      </DialogContent>

      <DialogActions sx={{ justifyContent: "center" }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>

    </Dialog>
  );
}