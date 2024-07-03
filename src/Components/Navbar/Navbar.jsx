import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <h3>Habit Tracker</h3>
      <div>Other Links</div>
    </div>
  );
};

export default Navbar;
