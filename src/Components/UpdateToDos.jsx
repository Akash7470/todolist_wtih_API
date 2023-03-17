import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

export default function UpdateModal() {
  console.log("update component");
  const [open, setOpen] = React.useState(true);

  const toDoId = JSON.parse(localStorage.getItem("id"));

  const { useState } = React;
  const [title, setTitle] = useState();
  const [status, setStatus] = useState();
  const navigate = useNavigate();

  const updateData = async (e) => {
    e.preventDefault();
    const res = await axios.put(`http://localhost:5000/todos/${toDoId}`, {
      title,
      status,
    });
    console.log("Updated data", res);
  };

  useEffect(() => {
    const fetchData = async () => {
      const toDoData = await axios.get(`http://localhost:5000/todos/${toDoId}`);
      console.log(toDoData);
      setTitle(toDoData?.data?.title);
      setStatus(toDoData?.data?.status);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AppBar position="static">
            <Toolbar
              variant="dense"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Update ToDo's here...
              </Typography>
              <CancelIcon
                sx={{ color: "#222" }}
                onSubmit={() => setOpen(false)}
                onClick={() => navigate("/")}
              />
            </Toolbar>
          </AppBar>
          <form onSubmit={updateData}>
            <Typography id="modal-modal-description">
              <TextField
                id="outlined-basic"
                label="Add Items here"
                placeholder="Items"
                value={title}
                autoComplete="Off"
                sx={{ minWidth: "100%", mt: "2vh" }}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Typography>
            <Typography id="modal-modal-description">
              <TextField
                id="outlined-basic"
                label="Status Of ToDo"
                placeholder="True/False"
                value={status}
                autoComplete="Off"
                varient="filled"
                sx={{ minWidth: "100%", mt: "3vh" }}
                onChange={(e) => setStatus(e.target.value)}
              />
            </Typography>
            <Button
              onClick={() => navigate(-1)}
              variant="contained"
              sx={{ m: "2vh", px: "4vh", mt: "3vh" }}
              type="submit"
            >
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
