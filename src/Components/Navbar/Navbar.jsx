import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

//Navbar component
const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <h3>
        <Link className={styles.logo} to={"/"}>
          Habit Tracker
        </Link>
      </h3>
    </div>
  );
};

export default Navbar;
