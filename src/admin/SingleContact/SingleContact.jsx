import { Link, useParams } from 'react-router-dom';
import { RiArrowGoBackLine, RiMailSendFill } from 'react-icons/ri';
import { useEffect, useContext, useState } from 'react';
import { UxContext } from '../../contexts/UxContext';

import axios from 'axios';
import './SingleContact.css';

const SingleContact = () => {
  const { id } = useParams();

  const [messageData, setMessageData] = useState();

  const { setMessage } = useContext(UxContext);

  useEffect(() => {
    axios.patch(`http://localhost:5000/contact/seen`, { id: id });
    axios.get('http://localhost:5000/contact').then(({ data }) => {
      setMessage(data);
    });
    axios.get(`http://localhost:5000/contact/${id}`).then(({ data }) => {
      setMessageData(data);
    });
  }, []);

  return (
    <div className="Singlecontact dashboard-main">
      <div className="single-container">
        <Link to="/admin/contact" className="contact-back">
          <RiArrowGoBackLine />
        </Link>
        <h1>{`Message de : ${messageData?.lastname} ${messageData?.firstname}`}</h1>
        <span className="single-email">{messageData?.email}</span>
        <span>{messageData?.message}</span>
        <a href={`mailto:${messageData?.email}`} className="single-mailto">
          <RiMailSendFill />
        </a>
      </div>
    </div>
  );
};

export default SingleContact;
