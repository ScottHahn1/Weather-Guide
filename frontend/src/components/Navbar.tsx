import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {

  return (
    <nav className="navbar">
      <ul className="nav-menu">
        <li className="nav-item">
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/daily">Daily</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/hourly">Hourly</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/this-week">This Week</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;