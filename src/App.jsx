import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./app/store";
import Navbar from "./components/Navbar";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/edit/:taskId" element={<EditTask />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
