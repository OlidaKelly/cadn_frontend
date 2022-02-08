import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UxContext } from '../../contexts/UxContext';
import { DefaultEditor } from 'react-simple-wysiwyg';
import './AddService.css';

const AddService = () => {
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState(0);
  const [price, setPrice] = useState(0);
  const [time, setTime] = useState(0);

  const { reponse, reponseType, handleMessage } = useContext(UxContext);

  useEffect(() => {
    axios.get('http://localhost:5000/categories').then(({ data }) => {
      setCategories(data);
    });
  }, []);

  const formData = new FormData();

  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.append('name', name);
    formData.append('id_category', category);
    formData.append('price', price);
    formData.append('time', time);
    formData.append('image', image);
    formData.append('description', description);
    formData.append('url', url);
    if (
      name !== '' &&
      description !== '' &&
      time !== 0 &&
      price !== 0 &&
      category !== 0 &&
      image !== null &&
      url !== ''
    ) {
      axios.post('http://localhost:5000/services', formData, config, {});
      handleMessage('valid', 'Votre Prestation a bien été créé', 5000);
      window.location.replace('http://localhost:3000/admin/services');
    } else {
      handleMessage('alert', 'Votre Prestation ne doit pas être vide', 5000);
    }
  };

  return (
    <div className="AddService dashboard-main">
      <div className="dashboard-add">
        <h1>Prestations</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom de la prestation"
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
              className="categories"
            >
              <option>--Catégorie--</option>
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
            className="editor"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input type="file" onChange={handleFile} className="image-uploader" />
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

export default AddService;
