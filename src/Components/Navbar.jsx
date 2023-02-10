import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, p: 2, bgcolor: "skyblue" }}>
      <AppBar position="static">
        <Toolbar>
          <h2>Dashboard</h2>
          <Typography
            variant="h2"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            ToDo List
          </Typography>

          <Button onClick={() => navigate("/create")} color="inherit">
            Create
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
