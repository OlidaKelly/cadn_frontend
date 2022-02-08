import { Link } from 'react-router-dom';
import lost from '../../assets/images/lost.jpg';
import './NoMatch.css';

const NoMatch = () => {
  return (
    <section className="NoMatch">
      <img src={lost} alt="Personne perdue dans la nature" className="lost" />
      <p>
        Nous sommes désolé mais cette page n&apos;existe pas ou plus. Si vous
        cherchiez une page existante merci de nous contacter pour nous tenir
        informé.
      </p>
      <Link to="/">Retour à l&apos;accueil</Link>
    </section>
  );
};

export default NoMatch;
