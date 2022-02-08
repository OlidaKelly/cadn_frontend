import { useState, useContext } from 'react';
import axios from 'axios';
import { UxContext } from '../../contexts/UxContext';
import { DefaultEditor } from 'react-simple-wysiwyg';
import './AddCategory.css';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const { reponse, reponseType, handleMessage } = useContext(UxContext);

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
    formData.append('image', image);
    formData.append('description', description);

    if (name !== '' && description !== '' && image !== null) {
      axios.post('http://localhost:5000/categories', formData, config, {});

      handleMessage('valid', 'Votre catégorie a bien été créé', 5000);
      window.location.replace('http://localhost:3000/admin/categories');
    } else {
      handleMessage('alert', 'Votre categorie ne doit pas être vide', 5000);
    }
  };

  return (
    <div className="AddCategory dashboard-main">
      <div className="dashboard-add">
        <h1>Catégorie</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom de la catégorie"
            onChange={(e) => setName(e.target.value)}
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

export default AddCategory;
