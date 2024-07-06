import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import localforage from "localforage";
import { useEffect } from "react";
import { habitSelector, setHabitDays } from "./Redux/Reducers/habitReducer";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { currentDate } = useSelector(habitSelector);
  localforage.config({
    name: "Habit tracker",
    storeName: "habitTracker",
    version: 1.0,
    description: "Habit tracker app storage",
    size: 50 * 1024 * 1024,
    driver: [
      localforage.INDEXEDDB,
      localforage.WEBSQL,
      localforage.LOCALSTORAGE,
    ],
  });
  useEffect(() => {
    dispatch(setHabitDays());
  }, [currentDate, dispatch]);

  return (
    <div className="App">
      <Navbar />
      <div style={{ height: "calc(100vh - 5.5rem)" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
