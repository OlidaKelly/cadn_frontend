import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import axios from 'axios';
import Services from '../../services/services.js';
import './DashboardServices.css';

const DashboardServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/services').then(({ data }) => {
      setServices(data);
    });
  }, []);

  return (
    <div className="DashboardService dashboard-main">
      <div className="dashboard-home">
        <table className="Table">
          <thead>
            <tr>
              <th>Prestations</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services?.map((s) => (
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
                        Services.handleDelete('services', s.id, setServices)
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

export default DashboardServices;
