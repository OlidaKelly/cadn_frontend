import { Link } from 'react-router-dom';
import { MdDashboardCustomize } from 'react-icons/md';
import './DashboardLink.css';

const DashboardLink = () => {
  return (
    <Link to="/admin" className="adminLink">
      <MdDashboardCustomize />
    </Link>
  );
};

export default DashboardLink;
