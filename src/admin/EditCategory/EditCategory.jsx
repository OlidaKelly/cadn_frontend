import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UxContext } from '../../contexts/UxContext';
import { useParams } from 'react-router-dom';
import { DefaultEditor } from 'react-simple-wysiwyg';
import './EditCategory.css';

const EditCategory = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const { id } = useParams();
  const { reponse, reponseType, handleMessage } = useContext(UxContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/categories/${id}`).then(({ data }) => {
      setName(data.name);
      setDescription(data.description);
      setImageUrl(data.image);
    });
  }, [id]);

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
    formData.append('image', image);
    formData.append('description', description);
    formData.append('imageUrl', imageUrl);

    if (name !== '' && description !== '') {
      const updated = await axios.put(
        'http://localhost:5000/categories',
        formData,
        config,
        {}
      );

      if (updated) {
        handleMessage('valid', 'Votre catégorie a bien été mise à jour', 3000);
        axios.get(`http://localhost:5000/categories/${id}`).then(({ data }) => {
          setImageUrl(data.image);
        });
      } else {
        handleMessage(
          'alert',
          'La catégorie n&apos;a pas été mise à jour.',
          3000
        );
      }
    } else {
      handleMessage('alert', 'Votre Catégorie ne doit pas être vide', 3000);
    }
  };
  return (
    <div className="EditCategory dashboard-main">
      <div className="dashboard-edit">
        <h1>Catégorie</h1>
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
            placeholder="Nom de la catégorie"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <DefaultEditor
            value={description}
            className="editor"
            onChange={(e) => setDescription(e.target.value)}
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

export default EditCategory;
