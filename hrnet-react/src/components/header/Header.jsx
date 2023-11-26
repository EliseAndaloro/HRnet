import { NavLink, useLocation } from "react-router-dom";
import "./header.css";

/**
 * Composant Header qui affiche le logo et les liens de navigation.
 * @returns {JSX.Element} Composant Header
 */
const Header = () => {
  const location = useLocation();
  let activeClassName = "display";

  return (
    <>
      <header className="header">
        <div className="hrnetTitle">
          <NavLink to="/">
            <h1> HRnet</h1>
          </NavLink>
        </div>
        <nav>
          <ul>
            {location.pathname !== "/" && (
              <li>
                <NavLink
                  to="/employees"
                  className={({ isActive }) =>
                    isActive ? activeClassName : undefined
                  }
                >
                  Current Employees
                </NavLink>
              </li>
            )}
            {location.pathname !== "/" && (
              <li>
                <NavLink
                  to="/create_employees"
                  className={({ isActive }) =>
                    isActive ? activeClassName : undefined
                  }
                >
                  Create Employees
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
