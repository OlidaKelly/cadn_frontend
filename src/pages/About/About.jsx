import './About.css';
import axios from 'axios';
import React from 'react';

const About = () => {
  const [text, setText] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:5000/about/1`).then(({ data }) => {
      setText(data);
    });
  }, []);

  return (
    <section className="About">
      <div className="blockTitle">
        <img
          src={text.image}
          alt="Cynthia Diefenbronn"
          className="image-about"
        />
        <h1 className="aboutTitle">{text?.fullname}</h1>
      </div>
      <p
        className="paragraph"
        dangerouslySetInnerHTML={{ __html: text?.description }}
      />
    </section>
  );
};

export default About;
