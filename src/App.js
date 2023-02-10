import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTodos from "./Components/CreateToDos";
import Data from "./Components/Homepage";
import UpdateModal from "./Components/UpdateToDos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <Data />
            </div>
          }
        />
        <Route path="/create" element={<CreateTodos />} />
        <Route path="/update" element={<UpdateModal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
