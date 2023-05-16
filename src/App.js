import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";

import "./styles.scss";

export default function App() {
  return (
    <div className="app">
      <NavBar />

      <Outlet />
    </div>
  );
}
