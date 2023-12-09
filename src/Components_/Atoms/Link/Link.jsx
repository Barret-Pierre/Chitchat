import './Link.css';
import { Link as RouterLink } from 'react-router-dom'; // Importez Link depuis react-router-dom

const Text = ({ text, type, link }) => {
  return (
    <RouterLink to={link} className={`link link__${type}`}>{text}</RouterLink>
  );
};

export default Text;