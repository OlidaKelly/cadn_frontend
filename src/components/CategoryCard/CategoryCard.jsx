import { Link } from 'react-router-dom';
import Services from '../../services/services.js';
import './CategoryCard.css';

const CategoryCard = ({ title, text, id, image }) => {
  const desc = Services.stripTag(text);
  const description = Services.strLimit(desc, 100);

  return (
    <div className="CategoryCard">
      <img src={image} alt={`Catégorie ${title}`} />
      <div className="item-container">
        <Link to={`/categorie/${id}`}>
          <h3>{title}</h3>
        </Link>
        <p>{description}</p>
        <p className="dots">...</p>
        <Link to={`/categorie/${id}`}>Voir Plus</Link>
      </div>
    </div>
  );
};

export default CategoryCard;
