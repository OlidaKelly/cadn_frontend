import {
  GrFacebook,
  GrInstagram,
  GrLinkedin,
  GrYoutube,
  GrTwitter,
} from 'react-icons/gr';
import { FaTiktok } from 'react-icons/fa';

const SocialIcon = ({ icon }) => {
  const icons = [
    <GrFacebook key={1} className="icon" />,
    <GrInstagram key={2} className="icon" />,
    <GrYoutube key={3} className="icon" />,
    <GrLinkedin key={4} className="icon" />,
    <GrTwitter key={5} className="icon" />,
    <FaTiktok key={6} className="icon" />,
  ];

  return (
    <a href={icon.url} target="_blank" rel="noreferrer">
      <li>{icons.filter((c) => c.key === icon.icon)}</li>
    </a>
  );
};

export default SocialIcon;
