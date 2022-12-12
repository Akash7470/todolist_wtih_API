import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import UpdateToDos from "./UpdateToDos";

function Data() {
  const [data, setData] = useState();

  //For Getting the data --
  useEffect(() => {
    getTodos();
  });

  const getTodos = async () => {
    const res = await axios.get("http://localhost:5000/todos");
    setData(res.data);
  };

  // For Deleting the data --
  const deleteTodos = async (id) => {
    const res = await axios.delete(`http://localhost:5000/todos/${id}`);
    console.log(res + "Deleted...");
  };

  // For Updating the Data --
  const updateTodos = (id) => {
    localStorage.setItem("id", JSON.stringify(id));
    return <UpdateToDos />;
  };

  // For Updating Status --
  const statusCheck = async (event, id) => {
    if (event === true) {
      const titleToDo = await axios.get(`http://localhost:5000/todos/${id}`);
      const res = await axios.put(`http://localhost:5000/todos/${id}`, {
        title: titleToDo.data.title,
        status: "true",
      });
    } else {
      const titleToDo = await axios.get(`http://localhost:5000/todos/${id}`);
      const res = await axios.put(`http://localhost:5000/todos/${id}`, {
        title: titleToDo.data.title,
        status: "false",
      });
    }
  };

  return (
    <>
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
                  Status:{" "}
                  <input
                    class="form-check-input mx-5"
                    type="checkbox"
                    id="myCheck"
                    onClick={(e) => statusCheck(e.target.checked, data.id)}
                    aria-label="Checkbox for following text input"
                  />
                </p>
                <a href="/update">
                  <button
                    type="button"
                    className="btn btn-primary mx-2"
                    onClick={(e) => updateTodos(data.id)}
                  >
                    Edit
                  </button>
                </a>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={(e) => deleteTodos(data.id)}
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
