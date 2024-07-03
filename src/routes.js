import Habit from "./Components/Habit/Habit";
import Home from "./Components/Home/Home";

const { createBrowserRouter } = require("react-router-dom");
const { default: App } = require("./App");

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "habit", element: <Habit /> },
    ],
  },
]);

export default routes;
