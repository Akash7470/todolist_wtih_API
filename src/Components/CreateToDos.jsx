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
import { useState } from "react";
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
  console.log("Create hoi[o0i");
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const postData = async () => {
    await axios
      .post("http://localhost:5000/todos", {
        id: Math.round(Math.random() * 10000),
        title: title,
        status: status,
      })
      .then((res) => console.log("Created Data", res.data))
      .catch((err) => console.log("errorrrrr", err));
    navigate(-1);
  };
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AppBar position="static" sx={{ width: "30vw" }}>
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
              {/* <a href="/"> */}
              <CancelIcon
                sx={{ color: "#222" }}
                onSubmit={() => setOpen(false)}
                onClick={() => navigate("/")}
              />
              {/* </a> */}
            </Toolbar>
          </AppBar>
          <form>
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
              onClick={postData}
              variant="contained"
              sx={{ m: "2vh", px: "4vh", mt: "3vh" }}
            >
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
