import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './contexts/UserContext.js';
import { UxContext } from './contexts/UxContext.js';
import { ProtectedRoute } from './protected/ProtectedRoute.js';
import Navbar from './components/Navbar/Navbar';
import Wrapper from './components/Wrapper/Wrapper';
import Footer from './components/Footer/Footer';
import DashboardLink from './components/DashboardLink/DashboardLink';
import ServiceDescription from './pages/ServiceDescription/ServiceDescription';
import Login from './admin/Login/Login';
import DashboardServices from './admin/DashboardServices/DashboardServices';
import DashboardAbout from './admin/DashboardAbout/DashboardAbout';
import DashboardCategory from './admin/DashboardCategory/DashboardCategory';
import AddService from './admin/AddService/AddService';
import AddCategory from './admin/AddCategory/AddCategory';
import EditCategory from './admin/EditCategory/EditCategory';
import EditService from './admin/EditService/EditService';
import DashboardContact from './admin/DashboardContact/DashboardContact';
import DashboardSocial from './admin/DashboardSocial/DashboardSocial';
import AddSocial from './admin/AddSocial/AddSocial';
import EditSocial from './admin/EditSocial/EditSocial';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import Contact from './pages/Contact/Contact';
import Category from './pages/Category/Category';
import SingleContact from './admin/SingleContact/SingleContact.jsx';
import NoMatch from './pages/NoMatch/NoMatch.jsx';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reponse, setReponse] = useState('');
  const [reponseType, setReponseType] = useState('');
  const [menu, setMenu] = useState('user');
  const [user, setUser] = useState({});
  const [seen, setSeen] = useState([]);
  const [message, setMessage] = useState([]);

  const deleteMessage = () => {
    setReponse('');
  };

  const handleMessage = (type, text, duration) => {
    setReponseType(type);
    setReponse(text);
    setTimeout(deleteMessage, duration);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:5000/security/user-is-auth', {
          headers: {
            'x-access-token': token,
          },
        })
        .then(({ data }) => {
          if (data.auth) {
            setIsAuthenticated(true);
            setUser(JSON.parse(localStorage.getItem('user')));
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
    >
      <UxContext.Provider
        value={{
          menu,
          reponse,
          reponseType,
          setMenu,
          setReponse,
          setReponseType,
          deleteMessage,
          handleMessage,
          seen,
          setSeen,
          message,
          setMessage,
        }}
      >
        {menu === 'user' ? <Navbar /> : ''}
        {isAuthenticated && <DashboardLink />}
        <main className="grid">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/categorie/:id" element={<Category />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDescription />} />
            <Route path="/cynthia-login" element={<Login />} />

            <Route path="admin" element={<ProtectedRoute />}>
              <Route path="categories" element={<DashboardCategory />} />
              <Route path="categories/add" element={<AddCategory />} />
              <Route path="categories/edit/:id" element={<EditCategory />} />
              <Route path="services" element={<DashboardServices />} />
              <Route path="services/add" element={<AddService />} />
              <Route path="services/edit/:id" element={<EditService />} />
              <Route path="about" element={<DashboardAbout />} />
              <Route path="contact" element={<DashboardContact />} />
              <Route path="social" element={<DashboardSocial />} />
              <Route path="social/add" element={<AddSocial />} />
              <Route path="social/edit/:id" element={<EditSocial />} />
              <Route path="single-contact/:id" element={<SingleContact />} />
            </Route>
            <Route path="/404" element={<NoMatch />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </main>
        <>
          <Footer />
          <Wrapper className={menu === 'user' ? 'none' : ''} />
        </>
      </UxContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
