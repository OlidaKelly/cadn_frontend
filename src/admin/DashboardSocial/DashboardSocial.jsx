import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Services from '../../services/services.js';
import { FaRegEdit } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import axios from 'axios';
import './DashboardSocial.css';

const DashboardSocial = () => {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/socials').then(({ data }) => {
      setSocials(data);
    });
  }, []);
  return (
    <div className="DashboardSocial dashboard-main">
      <div className="dashboard-home">
        <table className="Table">
          <thead>
            <tr>
              <th>Réseau social</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {socials?.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>
                  <div className="button-container">
                    <Link to={`edit/${s.id}`}>
                      <button className="edit">
                        <FaRegEdit />
                      </button>
                    </Link>
                    <button
                      className="trash"
                      onClick={() =>
                        Services.handleDelete('socials', s.id, setSocials)
                      }
                    >
                      <BsTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="add">
          <button className="button add-button">Ajouter</button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSocial;
