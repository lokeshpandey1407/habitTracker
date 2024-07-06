import React, { useEffect, useState } from "react";
import styles from "./Habit.module.css";
import { v4 as uuid } from "uuid";
import Select from "react-dropdown-select";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  addHabitAsync,
  deleteHabitAllAsync,
  deleteHabitAsync,
  fetchHabitsAsync,
  habitSelector,
  setActiveDate,
  updateHabitStatusAsync,
} from "../../Redux/Reducers/habitReducer";

const options = [
  {
    value: "Done",
    label: "Done",
  },
  {
    value: "Not Done",
    label: "Not Done",
  },
  {
    value: "None",
    label: "None",
  },
];
const Habit = () => {
  const { habits, activeDate, isLoading, isHabitsLoading, habitDays } =
    useSelector(habitSelector);
  const [habit, setHabit] = useState("");

  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!habit.trim()) {
      alert("Habit cannot be empty");
    } else {
      const habitObj = { id: uuid(), habit: habit, status: "None" };
      dispatch(addHabitAsync({ habitObj, habitDays, activeDate }));
      setHabit("");
    }
  };

  const handleUpdateValue = (values, habit) => {
    const status = values[0].value;
    const id = habit.id;
    dispatch(updateHabitStatusAsync({ status, id, activeDate }));
  };

  const handleDeleteHabit = (habit) => {
    let id = habit.id;
    dispatch(deleteHabitAsync({ id, activeDate }));
  };

  const handleDeleteHabitForAllDays = (habit) => {
    let id = habit.id;
    dispatch(deleteHabitAllAsync({ id, habitDays, activeDate }));
  };

  const handleCurrentDate = (val) => {
    dispatch(setActiveDate(val));
  };

  useEffect(() => {
    dispatch(fetchHabitsAsync(activeDate));
  }, [activeDate, dispatch]);

  return (
    <div className={styles.habitContainer}>
      <div className={styles.formContainer}>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="habit"
            name="habit"
            value={habit}
            placeholder="What do you want to do ?"
            onChange={(e) => {
              setHabit(e.target.value);
            }}
          />
          <button
            title="Add Habit"
            className={styles.addBtn}
            onClick={handleAdd}
            disabled={isLoading}
          >
            {isLoading ? "..." : "+"}
          </button>
        </div>
      </div>
      <hr />
      <div className={styles.dateSliderContainer}>
        {habitDays.map((day, index) => {
          return (
            <button
              key={index}
              className={styles.btn}
              style={{
                backgroundColor: `${activeDate === day ? "green" : " skyblue"}`,
                color: `${activeDate === day ? "#fff" : " black"}`,
              }}
              onClick={() => handleCurrentDate(day)}
            >
              {day}
            </button>
          );
        })}
      </div>
      <div className={styles.habitsContainer}>
        {isHabitsLoading && <div>Loading...</div>}
        {habits.map((habit, index) => {
          return (
            <div
              key={index}
              className={styles.habitCard}
              style={{
                backgroundColor: `${
                  habit.status === "Not Done"
                    ? "#d97979"
                    : habit.status === "Done"
                    ? "#6ed96e"
                    : "skyblue"
                }`,
              }}
            >
              <p className={styles.habitTitle}>{habit.habit}</p>
              <Select
                style={{ width: "150px" }}
                options={options}
                placeholder="Status"
                values={[{ value: habit.status, label: habit.status }]}
                onChange={(values) => handleUpdateValue(values, habit)}
              />
              <details title="Options">
                <summary>
                  <BsThreeDotsVertical />
                </summary>
                <ul>
                  <li
                    onClick={() => {
                      handleDeleteHabit(habit);
                    }}
                    title="Delete the habit for current day."
                  >
                    Delete
                  </li>
                  <li
                    onClick={() => {
                      handleDeleteHabitForAllDays(habit);
                    }}
                    title="Detele the habit for all days."
                  >
                    Delete For Everyday
                  </li>
                </ul>
              </details>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Habit;
