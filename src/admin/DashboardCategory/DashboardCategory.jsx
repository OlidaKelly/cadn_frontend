import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Services from '../../services/services.js';
import { FaRegEdit } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import axios from 'axios';
import './DashboardCategory.css';

const DashboardCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/categories').then(({ data }) => {
      setCategories(data);
    });
  }, []);

  return (
    <div className="DashboardCategory dashboard-main">
      <div className="dashboard-home">
        <table className="Table">
          <thead>
            <tr>
              <th>Catégories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>
                  <div className="button-container">
                    <Link to={`edit/${c.id}`}>
                      <button className="edit">
                        <FaRegEdit />
                      </button>
                    </Link>
                    <button
                      className="trash"
                      onClick={() =>
                        Services.handleDelete('categories', c.id, setCategories)
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

export default DashboardCategory;
