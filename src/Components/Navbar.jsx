import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ToDoBoxModal from "./CreateToDos";

export default function Navbar() {
  const [openModal, setOpenModal] = React.useState(false);

  const setOpen = () => {
    setOpenModal(true);
  };
  return (
    <Box sx={{ flexGrow: 1, p: 2, bgcolor: "skyblue" }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">Dashboard</Button>
          <Typography
            variant="h2"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            ToDo List
          </Typography>
          <a href="/create" style={{ textDecoration: "none", color: "#fff" }}>
            <Button color="inherit" onClick={setOpen}>
              Create
            </Button>
          </a>
          {openModal && <ToDoBoxModal />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
