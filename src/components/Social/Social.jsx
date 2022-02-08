import { useState, useEffect } from 'react';
import axios from 'axios';
import './Social.css';
import SocialIcon from '../SocialIcon/SocialIcon';

const Social = () => {
  const [text, setText] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/socials`).then(({ data }) => {
      setText(data);
    });
  }, []);

  return (
    <ul className="Social">
      {text.map((c) => (
        <SocialIcon key={c.id} icon={c} />
      ))}
    </ul>
  );
};

export default Social;
