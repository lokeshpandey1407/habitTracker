import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import localforage from "localforage";
import { useEffect } from "react";
import { setHabitDays } from "./Redux/Reducers/habitReducer";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
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
  }, []);

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
