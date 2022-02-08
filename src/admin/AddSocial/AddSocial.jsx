import { useState, useContext } from 'react';
import { UxContext } from '../../contexts/UxContext';
import axios from 'axios';
import {
  GrFacebook,
  GrInstagram,
  GrLinkedin,
  GrYoutube,
  GrTwitter,
} from 'react-icons/gr';
import { FaTiktok } from 'react-icons/fa';
import './AddSocial.css';

const AddSocial = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [icon, setIcon] = useState('');

  const icons = [
    <GrFacebook key={1} className="icon" />,
    <GrInstagram key={2} className="icon" />,
    <GrYoutube key={3} className="icon" />,
    <GrLinkedin key={4} className="icon" />,
    <GrTwitter key={5} className="icon" />,
    <FaTiktok key={6} className="icon" />,
  ];

  const { reponse, reponseType, handleMessage } = useContext(UxContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      e.target[0].value !== '' &&
      e.target[1].value !== '' &&
      e.target[2].value !== ''
    ) {
      axios.post('http://localhost:5000/socials', {
        name: name,
        url: url,
        icon: icon,
      });
      handleMessage('valid', 'Votre réseau social a bien été crée', 5000);
      window.location.replace('http://localhost:3000/admin/social');
    } else {
      handleMessage('alert', 'Votre réseau social ne doit pas être vide', 5000);
    }
  };

  return (
    <div className="AddSocial dashboard-main">
      <div className="dashboard-add">
        <h1>Catégorie</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom du réseau social"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="url"
            placeholder="Url"
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="input-container">
            <select
              name="icon"
              onChange={(e) => setIcon(e.target.value)}
              defaultValue={icon}
              className="iconSelect"
            >
              <option value="1">FaceBook</option>
              <option value="2">Instagram</option>
              <option value="3">Youtube</option>
              <option value="4">Linkedin</option>
              <option value="5">Twitter</option>
              <option value="6">TikTok</option>
            </select>
            {icons.filter((i) => i.key === icon)}
          </div>
          <button className="button add-button" type="submit">
            Ajouter
          </button>
        </form>
        {reponse !== '' ? (
          <div className={`created ${reponseType}`}>{reponse}</div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default AddSocial;
