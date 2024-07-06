import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

//Home component for Home page
const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Habit</h1>
      <p className={styles.subTitle}>
        It's commonly believed that it takes 21 days to form a habit, but
        research suggests it actually takes an average of 66 days for a new
        behavior to become a habit.
      </p>
      <Link className={styles.habitLink} to={"/habit"}>
        Begin Your Journey!
      </Link>
    </div>
  );
};

export default Home;
