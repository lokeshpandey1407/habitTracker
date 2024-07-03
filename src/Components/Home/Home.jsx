import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

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
      {/* <p>
        Willpower can be strengthened with practice but can also be depleted.
        Regular exercise of willpower can make it stronger over time
      </p>
      <p>
        Many successful people attribute part of their success to a strong
        morning routine that sets a positive tone for the day{" "}
      </p> */}
    </div>
  );
};

export default Home;
