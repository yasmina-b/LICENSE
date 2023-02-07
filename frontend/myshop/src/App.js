import React from "react";
import AppRoutes from "./AppRoutes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <AppRoutes />
      <Footer />
    </React.Fragment>
  );
}

export default App;
