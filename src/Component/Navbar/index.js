import React from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const clickHome = () => {
    navigate("/");
  };
  return (
    <div className="header" data-cy="header-background">
      <div className="container" onClick={clickHome}>
        <h2 data-cy="header-title">TO DO LIST APP</h2>
      </div>
    </div>
  );
}

export default Navbar;
