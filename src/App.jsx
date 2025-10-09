// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ListPage from "./pages/ListPage";
import UpsertPage from "./pages/UpsertPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/add" element={<UpsertPage />} />
        <Route path="/edit/:id" element={<UpsertPage isEdit />} />
      </Routes>
    </BrowserRouter>
  );
}
