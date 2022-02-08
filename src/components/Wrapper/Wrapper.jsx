import { useContext } from 'react';
import { UxContext } from '../../contexts/UxContext';
import './Wrapper.css';

const Wrapper = () => {
  const { menu } = useContext(UxContext);

  return (
    <div className={`Wrapper mobile ${menu === 'user' ? '' : 'none'}`}></div>
  );
};

export default Wrapper;
