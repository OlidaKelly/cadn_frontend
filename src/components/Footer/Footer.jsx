import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { UxContext } from '../../contexts/UxContext';
import Social from '../Social/Social';
import { Link } from 'react-router-dom';
import { AiFillPhone } from 'react-icons/ai';
import { MdMail } from 'react-icons/md';
import './Footer.css';

const Footer = () => {
  const [about, setAbout] = useState();

  const { menu } = useContext(UxContext);

  useEffect(() => {
    axios.get('http://localhost:5000/about/1').then(({ data }) => {
      setAbout(data);
    });
  }, []);

  return (
    <footer className={menu === 'user' ? '' : 'none'}>
      <div className="infos">
        <span>{about?.fullname}</span>
        <span>Thérapeute en Nutrition Santé et Naturopathie</span>
      </div>
      <div className="infos-contact">
        <Link to={`tel:${about?.phone}`}>
          <div className="footer-info-container">
            <AiFillPhone />
            <span>{about?.phone}</span>
          </div>
        </Link>
        <div className="footer-info-container">
          <MdMail />
          <span>{about?.email}</span>
        </div>
      </div>
      <div className="footer-container">
        <span className="reseau">Rejoignez moi sur les réseaux</span>
        <Social datas={about && about} />
      </div>
    </footer>
  );
};

export default Footer;
