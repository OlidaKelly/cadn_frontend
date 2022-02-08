import axios from 'axios';
import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UxContext } from '../../contexts/UxContext';
import './DashboardAside.css';

const DashboardAside = () => {
  const { setMessage, message, setSeen, seen } = useContext(UxContext);

  useEffect(() => {
    axios.get('http://localhost:5000/contact').then(({ data }) => {
      setMessage(data);
    });
  }, []);

  useEffect(() => {
    setSeen(message.filter((m) => m.seen === 0));
  }, [message]);

  return (
    <aside className="DashboardAside">
      <ul>
        <Link to="about">
          <li>A Propos</li>
        </Link>
        <Link to="categories">
          <li>Catégories</li>
        </Link>
        <Link to="contact">
          <li>
            Contact{' '}
            {seen.length !== 0 && (
              <span className="unseen">{seen?.length}</span>
            )}
          </li>
        </Link>
        <Link to="services">
          <li>Prestations</li>
        </Link>
        <Link to="social">
          <li>Réseaux</li>
        </Link>
      </ul>
    </aside>
  );
};

export default DashboardAside;
