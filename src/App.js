import Navbar from "./Component/Navbar";
import NewActivity from "./Pages/NewActivity";
import Home from "./Pages/Home";
import AddTodo from "./Component/AddTodo";
import DeleteAlert from "./Component/AlertDaelete";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AlertSucces from "./Component/AlertSucces";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<NewActivity />} />
          {/* <Route path="/delete/:id" element={<DeleteAlert />} /> */}
          {/* <Route path="/alertInfo" element={<AlertSucces />} /> */}
          <Route path="/addtodo" element={<AddTodo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
