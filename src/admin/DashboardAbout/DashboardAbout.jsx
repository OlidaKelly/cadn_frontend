import axios from 'axios';
import { useContext } from 'react';
import { UxContext } from '../../contexts/UxContext';
import { useState, useEffect } from 'react';
import { DefaultEditor } from 'react-simple-wysiwyg';
import './DashboardAbout.css';

const DashboardAbout = () => {
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [adress, setAdress] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState();

  const { reponse, reponseType, handleMessage } = useContext(UxContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/about/1`).then(({ data }) => {
      setDescription(data.description);
      setEmail(data.email);
      setFullname(data.fullname);
      setPhone(data.phone);
      setAdress(data.adress);
      setImageUrl(data.image);
    });
  }, []);

  const formData = new FormData();

  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.append('id', 1);
    formData.append('description', description);
    formData.append('email', email);
    formData.append('fullname', fullname);
    formData.append('phone', phone);
    formData.append('adress', adress);

    formData.append('image', image);
    formData.append('imageUrl', imageUrl);

    if (
      fullname !== '' &&
      description !== '' &&
      email !== 0 &&
      phone !== 0 &&
      adress !== 0
    ) {
      axios.put('http://localhost:5000/about', formData, config, {});

      handleMessage(
        'valid',
        'Vos informations ont bien été mises à jour',
        5000
      );
    } else {
      handleMessage('alert', 'Vos informations ne doit pas être vide', 5000);
    }
  };

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="EditAbout dashboard-main">
      <div className="dashboard-edit">
        <h1>Cynthia Diefenbronn</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="image-container">
            <input type="file" onChange={handleFile} />
            <div
              className="image-preview"
              style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>
          </div>
          <input
            type="text"
            id="fullname"
            placeholder="Nom Prenom"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <input
            type="text"
            placeholder="mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="adresse postale"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
          />
          <input
            type="text"
            id="phone"
            placeholder="Telephone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <DefaultEditor
            value={description}
            className="editor"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="button add-button" type="submit">
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

export default DashboardAbout;
