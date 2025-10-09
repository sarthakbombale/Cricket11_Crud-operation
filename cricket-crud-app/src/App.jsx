import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ListPage from "./pages/ListPage";
import UpsertPage from "./pages/UpsertPage";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/upsert" element={<UpsertPage />} />
      </Routes>
    </Router>
  );
};

export default App;