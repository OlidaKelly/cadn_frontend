import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Hero from '../../components/Hero/Hero.jsx';
import './Category.css';

const Category = () => {
  const { id } = useParams();

  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/categories/${id}`).then(({ data }) => {
      setCategory(data);
    });
  }, []);

  return (
    <>
      <Hero image={category?.image} title={category?.name} />
      <section className="Category">
        <p
          className="description"
          dangerouslySetInnerHTML={{ __html: category.description }}
        ></p>
      </section>
    </>
  );
};

export default Category;
