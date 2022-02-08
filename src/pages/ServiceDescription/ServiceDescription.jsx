import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ImHourGlass, ImPriceTag } from 'react-icons/im';
import axios from 'axios';
import Hero from '../../components/Hero/Hero';
import './ServiceDescription.css';

const ServiceDescription = () => {
  const [dataService, setDataService] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/services/${id}`)
      .then(({ data }) => setDataService(data));
  }, []);
  return (
    <section className="ServiceDescription">
      <Hero
        className="serviceHero"
        title={dataService.name}
        image={dataService.image}
      />
      <div className="infos-serviceDescription">
        <h3>Infos Prestation</h3>
        <div className="info-container">
          <p className="infos">
            <ImHourGlass /> {dataService.time} min
          </p>
          <p className="infos">
            <ImPriceTag /> {dataService.price} €
          </p>
        </div>
        <h3 className="alternative-title">Detail de la prestation</h3>
        <div
          className="text"
          dangerouslySetInnerHTML={{ __html: dataService.description }}
        ></div>
      </div>
    </section>
  );
};

export default ServiceDescription;
