import React, { useEffect, useState } from "react";
import "./Navbar.css";
import button from "@material-ui/core";
import { Redirect , useHistory} from "react-router-dom";



function Navbar() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [loggedOut, setLoggedOut] = useState(false);
  let history = useHistory();

  useEffect(() => {
    console.log(localStorage.getItem("loggedIn"));
    setLoggedIn(JSON.parse(localStorage.getItem("loggedIn")));
    console.log(loggedIn);
  }, [localStorage.getItem("loggedIn")]);


  const logout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedOut(true);

  };

  if (loggedOut) {
    history.push("/login");
    window.location.reload();
  }

  return (
    <div className="Navbar">

      <h1>HAFgram</h1>
      <a href="/">Home</a>
      
      {loggedIn ? (
        <>
          <button className="logout" onClick={logout}>LogOut</button>
          <a href="/upload">Upload</a>
          <a href="/profile">Profile</a>
        </>
      ) : (
        <>
          <a href="/register">Register</a>
          <a href="/login">Login</a>
        </>
      )}
    </div>
  );
}

export default Navbar;
