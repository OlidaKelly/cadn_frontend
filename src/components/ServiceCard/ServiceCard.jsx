import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Services from '../../services/services.js';
import './ServiceCard.css';

const ServiceCard = ({ datas }) => {
  const [category, setCategory] = useState();

  useEffect(() => {
    axios.get('http://localhost:5000/categories').then(({ data }) => {
      const cat = data?.filter((c) => c.id === datas.id_category);
      setCategory(cat[0].name);
    });
  }, []);

  const desc = Services.stripTag(datas.description);
  const description = Services.strLimit(desc, 70);

  return (
    <div className="ServiceCard">
      <img className="img-service-card" src={datas.image} alt={datas.name} />
      <div className="service-infos-container">
        <h3>{datas.name}</h3>
        <span className="tag">{category}</span>
        <p className="description">
          {description}
          <br />
          <Link to={`/services/${datas.id}`} className="seeMore">
            Afficher plus [...]
          </Link>
        </p>
        <div className="items-service-card">
          <p className="time">{datas.time} min</p>
          <p className="price">{datas.price} €</p>
        </div>
        <a
          className="button-link"
          href={datas.url}
          target="_blank"
          rel="noreferrer"
        >
          <button className="button book">Réserver</button>
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
