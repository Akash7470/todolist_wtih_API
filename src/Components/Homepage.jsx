import axios from "axios";
import React from "react";
// import { useEffect } from "react";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Data() {
  const [data, setData] = useState();
  const navigate = useNavigate();

  //For Getting the data --
  const getTodos = async () => {
    const res = await axios.get("http://localhost:5000/todos");
    setData(res.data);
  };

  // For Deleting the data --
  const deleteTodos = async (id) => {
    const res = await axios.delete(`http://localhost:5000/todos/${id}`);
    console.log(res + "Deleted...");
    getTodos();
  };

  // For Updating the Data --
  const updateTodos = (id) => {
    localStorage.setItem("id", JSON.stringify(id));
    navigate("/update");
  };

  // For Updating Status --
  const statusCheck = async (event, id) => {
    if (event === true) {
      const titleToDo = await axios.get(`http://localhost:5000/todos/${id}`);
      const res = await axios.put(`http://localhost:5000/todos/${id}`, {
        title: titleToDo.data.title,
        status: "true",
      });
      console.log("Status Done", res);
    } else {
      const titleToDo = await axios.get(`http://localhost:5000/todos/${id}`);
      const res = await axios.put(`http://localhost:5000/todos/${id}`, {
        title: titleToDo.data.title,
        status: "false",
      });
      console.log(res);
    }
  };

  useEffect(() => {
    console.log("USE EFFECT CHAL RHA H");
    getTodos();
  }, []);

  return (
    <>
      <Navbar />
      {data?.map((data, index) => {
        return (
          <div className="d-inline-flex flex-wrap" key={index}>
            <div className="card bg-info m-3" style={{ width: "18rem" }}>
              <div
                id="circle"
                style={{
                  width: "5rem",
                  height: "2rem",
                  borderRadius: "10%",
                  border: "1px solid #222",
                  margin: "10px",
                  textAlign: "center",
                }}
              >
                {data.id}
              </div>
              <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
                <p className="card-text d-flex justify-content-between align-items-center">
                  Status: aaaaaaaaaaaaaaaaaa{" "}
                  <input
                    className="form-check-input mx-5"
                    type="checked"
                    id="myCheck"
                    onClick={(e) => statusCheck(e.target.checked, data.id)}
                    aria-label="Checkbox for following text input"
                  />
                </p>
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  onClick={(e) => updateTodos(data.id)}
                >
                  Edit khub sare karoo bhaii
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteTodos(data.id)}
                >
                  {" "}
                  delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Data;
