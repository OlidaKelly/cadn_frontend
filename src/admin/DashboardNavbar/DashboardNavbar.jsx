import { Link } from 'react-router-dom';
import { ImHome } from 'react-icons/im';
import { FaUserCircle } from 'react-icons/fa';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './DashboardNavbar.css';

const DashboardNavbar = () => {
  const { user, setUser, setIsAuthenticated } = useContext(UserContext);

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUser({});
    window.location.href = '/';
  };
  return (
    <>
      <nav className="DashboardNavbar">
        {user && (
          <span className="welcome">
            <FaUserCircle />
            Bienvenue Cynthia
          </span>
        )}
        <span className="dashboard-Navbar-container">
          <button
            className="button logout"
            tabIndex={0}
            onClick={() => logout()}
          >
            Déconnexion
          </button>
          <Link to="/" className="home">
            <ImHome />
          </Link>
        </span>
      </nav>
    </>
  );
};

export default DashboardNavbar;
