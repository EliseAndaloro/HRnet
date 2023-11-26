import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateEmployees from "./pages/createEmployees/CreateEmployees";
import CurrentEmployee from "./pages/currentEmployee/CurrentEmployee";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";

/**
 * Composant principal de l'application, qui gère le routage et affiche les différentes pages.
 * @returns {JSX.Element} Composant App
 *
 */
function App() {
  return (
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/employees" element={<CurrentEmployee />}></Route>
          <Route path="/create_employees" element={<CreateEmployees />}></Route>
        </Routes>
      </div>
  );
}

export default App;
