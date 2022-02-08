import { useEffect, useContext } from 'react';
import { UxContext } from '../../contexts/UxContext.js';
import { Link } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import { FaSearchPlus } from 'react-icons/fa';
import { IoMdMailOpen, IoMdMailUnread } from 'react-icons/io';

import axios from 'axios';
import Services from '../../services/services.js';
import './DashboardContact.css';

const DashboardContact = () => {
  const { message, setMessage } = useContext(UxContext);

  useEffect(() => {
    axios.get('http://localhost:5000/contact').then(({ data }) => {
      setMessage(data);
    });
  }, []);

  return (
    <div className="DashboardContact dashboard-main">
      <div className="dashboard-home">
        <table className="Table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Message</th>
              <th>Lu/Non lu</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {message?.map((m) => (
              <tr key={m.id}>
                <td>{m.lastname}</td>
                <td>{m.firstname}</td>
                <td>
                  <a href={`mailto:${m.email}`}>{m.email}</a>
                </td>
                <td>{Services.strLimit(m.message, 40)}</td>
                <td>
                  <div className="unread-container">
                    {m.seen === 1 ? (
                      <IoMdMailOpen className="read" />
                    ) : (
                      <IoMdMailUnread className="unread" />
                    )}
                  </div>
                </td>
                <td>
                  <div className="button-container">
                    <Link to={`/admin/single-contact/${m.id}`}>
                      <button className="single-contact-link">
                        <FaSearchPlus />
                      </button>
                    </Link>
                    <button
                      className="trash"
                      onClick={() =>
                        Services.handleDelete('contact', m.id, setMessage)
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
      </div>
    </div>
  );
};

export default DashboardContact;
