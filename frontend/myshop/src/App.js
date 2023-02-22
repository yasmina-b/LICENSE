import React from "react";
import AppRoutes from "./AppRoutes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Promo from "./components/Promo";
import "./index.css";

function App() {
  return (
    <React.Fragment>
      <Promo/>
      <Navbar />
      <AppRoutes />
      <Footer />
    </React.Fragment>
  );
}

export default App;
