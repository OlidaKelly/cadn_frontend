import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UxContext } from '../../contexts/UxContext';
import { AiFillPhone } from 'react-icons/ai';
import './Contact.css';

const Contact = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [about, setAbout] = useState([]);

  const { reponse, reponseType, handleMessage } = useContext(UxContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/about/1`).then(({ data }) => {
      setAbout(data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message !== '' && email !== '' && firstname !== '' && lastname !== '') {
      axios.post('http://localhost:5000/contact', {
        firstname: firstname,
        lastname: lastname,
        email: email,
        message: message,
      });

      setEmail('');
      setFirstname('');
      setLastname('');
      setMessage('');

      handleMessage('valid', 'Votre message a bien été envoyé', 3000);
    } else {
      handleMessage('alert', 'Vos informations doivent être complètes', 3000);
    }
  };

  return (
    <section className="Contact">
      <h1>Contact</h1>
      <form className="Form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Prénom"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nom de Famille"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          type="text"
          value={message}
          placeholder="Votre Message ici"
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit" className="button contact-button">
          Envoyer
        </button>
      </form>
      {reponse !== '' ? (
        <div className={`created ${reponseType}`}>{reponse}</div>
      ) : (
        ''
      )}
      <Link className="contact-phone" to={`tel:${about?.phone}`}>
        <span>Me Contacter</span>
        <AiFillPhone className="mobile-phone" />
      </Link>
    </section>
  );
};

export default Contact;
