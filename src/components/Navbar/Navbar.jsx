// import { GiYinYang } from 'react-icons/gi';
import logo from '../../assets/images/logo2.png';
import { Link } from 'react-router-dom';
import { AiOutlinePhone } from 'react-icons/ai';
import { GoHome } from 'react-icons/go';
import { BsShop, BsPersonCircle } from 'react-icons/bs';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="Navbar">
      <Link to="/">
        <img src={logo} alt="Accueil" className="logo" />
      </Link>
      <ul className="menu">
        <Link to="/" className={`mobile`}>
          <li>
            <GoHome className="nav-icon" />
            <span className="nav-text">Accueil</span>
          </li>
        </Link>
        <Link to="/about">
          <li>
            <BsPersonCircle className="nav-icon" />
            <span className="nav-text">A Propos</span>
          </li>
        </Link>
        <Link to="/services">
          <li>
            <BsShop className="nav-icon" />
            <span className="nav-text">Prestations</span>
          </li>
        </Link>
        <Link to="/contact">
          <li>
            <AiOutlinePhone className="nav-icon" />
            <span className="nav-text">Contact</span>
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
