import { useContext, useEffect, useState } from 'react';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import { CgMouse } from 'react-icons/cg';
import { UxContext } from '../../contexts/UxContext';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [categories, setCategories] = useState();
  const { setMenu } = useContext(UxContext);
  useEffect(() => {
    setMenu('user');
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/categories').then(({ data }) => {
      setCategories(data);
    });
  }, []);

  return (
    <>
      <section className="Home">
        <div className="title-container">
          <h1 className="homeTitle">Cynthia Diefenbronn</h1>
          <span className="job">
            Thérapeute en Nutrition Santé et Naturopathie
          </span>
        </div>
        <CgMouse className="scroll" />
      </section>
      <section className="items">
        <h2>Mes Spécialités</h2>
        <div className="items-container">
          {categories?.map((c) => (
            <CategoryCard
              key={c.id}
              title={c.name}
              text={c.description}
              id={c.id}
              image={c.image}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
