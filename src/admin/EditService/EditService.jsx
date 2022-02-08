import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { UxContext } from '../../contexts/UxContext';
import { useParams } from 'react-router-dom';
import { DefaultEditor } from 'react-simple-wysiwyg';
import './EditService.css';

const EditService = () => {
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState(0);
  const [url, setUrl] = useState('');
  const [price, setPrice] = useState(0);
  const [time, setTime] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const { id } = useParams();
  const { reponse, reponseType, handleMessage } = useContext(UxContext);

  useEffect(() => {
    axios.get('http://localhost:5000/categories').then(({ data }) => {
      setCategories(data);
    });
    axios.get(`http://localhost:5000/services/${id}`).then(({ data }) => {
      setName(data.name);
      setDescription(data.description);
      setTime(data.time);
      setPrice(data.price);
      setCategory(data.id_category);
      setImageUrl(data.image);
      setUrl(data.url);
    });
  }, []);

  const formData = new FormData();

  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('id_category', category);
    formData.append('price', price);
    formData.append('time', time);
    formData.append('image', image);
    formData.append('description', description);
    formData.append('imageUrl', imageUrl);
    formData.append('url', url);

    if (
      name !== '' &&
      description !== '' &&
      time !== 0 &&
      price !== 0 &&
      category !== 0 &&
      url !== ''
    ) {
      const updated = await axios.put(
        'http://localhost:5000/services',
        formData,
        config,
        {}
      );

      if (updated) {
        handleMessage('valid', 'Votre prestation a bien été mise à jour', 3000);
        axios.get(`http://localhost:5000/services/${id}`).then(({ data }) => {
          setImageUrl(data.image);
        });
      } else {
        handleMessage('alert', 'Une erreur est survenue', 3000);
      }
    } else {
      handleMessage('alert', 'Votre prestation ne doit pas être vide', 3000);
    }
  };

  return (
    <div className="EditService dashboard-main">
      <div className="dashboard-edit">
        <h1>Prestations</h1>
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
            placeholder="Nom de la prestation"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="input-container">
            <input
              type="number"
              id="price"
              placeholder="Prix de la prestation"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label htmlFor="price">€</label>
            <input
              type="number"
              id="time"
              placeholder="Temps de la prestation"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <label htmlFor="time">min</label>
            <select
              name="categories"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="categories"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            placeholder="Lien SimplyBook"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <DefaultEditor
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="editor"
          />
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

export default EditService;
