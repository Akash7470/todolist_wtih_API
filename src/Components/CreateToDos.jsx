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

export default function CreateModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();

  const { useState } = React;
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(false);

  const postData = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:5000/todos", {
        id: Math.round(Math.random() * 10000),
        title: title,
        status: "false",
      })
      .then((res) => console.log("Posted Data", res.data))
      .catch((err) => console.log("errorrrrr", err));
  };
  return (
    <div>
      {
        (window.onload = () => {
          handleOpen();
        })
      }
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AppBar position="static" sx={{ width: "26vw" }}>
            <Toolbar
              variant="dense"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Your ToDo's here...
              </Typography>
              <a href="/">
                <CancelIcon
                  sx={{ color: "#222" }}
                  onSubmit={() => setOpen(false)}
                />
              </a>
            </Toolbar>
          </AppBar>
          <form onSubmit={postData}>
            <Typography id="modal-modal-description">
              <TextField
                id="outlined-basic"
                label="Add Items here"
                placeholder="Items"
                autoComplete="Off"
                sx={{ width: "25.75vw", mt: "2vh" }}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Typography>
            <Typography id="modal-modal-description">
              <TextField
                id="outlined-basic"
                label="Status Of ToDo"
                placeholder="True/False"
                autoComplete="Off"
                varient="filled"
                sx={{ width: "25.75vw", mt: "3vh" }}
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
