import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
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
import './EditSocial.css';

const EditSocial = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [icon, setIcon] = useState('');

  const { id } = useParams();
  const { reponse, reponseType, handleMessage } = useContext(UxContext);

  const icons = [
    <GrFacebook key={1} className="icon" />,
    <GrInstagram key={2} className="icon" />,
    <GrYoutube key={3} className="icon" />,
    <GrLinkedin key={4} className="icon" />,
    <GrTwitter key={5} className="icon" />,
    <FaTiktok key={6} className="icon" />,
  ];

  useEffect(() => {
    axios.get(`http://localhost:5000/socials/${id}`).then(({ data }) => {
      setName(data.name);
      setUrl(data.url);
      setIcon(data.icon);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name !== '' && url !== '' && icon !== null) {
      const updated = await axios.put('http://localhost:5000/socials', {
        id: id,
        name: name,
        url: url,
        icon: icon,
      });

      if (updated) {
        handleMessage(
          'valid',
          'Votre réseau social a bien été mis à jour',
          5000
        );
      }
    } else {
      handleMessage('alert', 'Ce champ ne doit pas être vide', 5000);
    }
  };

  return (
    <div className="EditSocial dashboard-main">
      <div className="dashboard-edit">
        <h1>Réseau Social</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom du réseau social"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="url"
            placeholder="Url du réseau social"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="input-container">
            <select
              name="icon"
              onChange={(e) => setIcon(e.target.value)}
              value={icon}
              className="iconSelect"
            >
              <option value="1">Facebook</option>
              <option value="2">Instagram</option>
              <option value="3">Youtube</option>
              <option value="4">Linkedin</option>
              <option value="5">Twitter</option>
              <option value="6">TikTok</option>
            </select>
            {icons.filter((i) => i.key === icon)}
          </div>
          <button className="button edit-button" type="submit">
            Mettre à jour
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

export default EditSocial;
