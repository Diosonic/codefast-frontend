import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";

export default function App() {
  return (
    <div className="App">
      <NavBar />

      <Outlet />
    </div>
  );
}
