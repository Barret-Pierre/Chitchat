import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Atoms/Input/Input';
import Button from '../../Atoms/Button/Button';
import Link from '../../Atoms/Link/Link';
import Text from '../../Atoms/Text/Text';

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // TODO: remplacer par une requête fetch ou axios vers le backend
  const users = [
    { email: 'test@example.com', password: 'test123', userName: 'username' },
  ];

  const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validateForm(formData);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    try {
      const response = await checkUserExists(formData);
      if (response.success) {
        const user = users.find(user => user.email === formData.email);
        if (user) {
          navigate(`/chat/${user.userName}`);
        }
      } else {
        setErrors({ login: 'Mot de passe incorrect' });
      }
    } catch (error) {
      console.error(error);
    }
  }
};

  const checkUserExists = async (data) => {
    const user = users.find(
      (user) => user.email === data.email && user.password === data.password
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user) {
          resolve({ success: true });
        } else {
          resolve({ success: false });
        }
      }, 1000);
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(email)) {
      return false;
    }
    if (!email.includes('@')) {
      return false;
    }
    return true;
  };

  const validateForm = (data) => {
    const errors = {};

    if (data.email === '') {                                      
      errors.email = "Le champ email est vide";
    } else if (!isValidEmail(data.email)) {
      errors.email = "L'adresse email n'est pas valide";
    }
    if (data.password === '') {                                      
      errors.password = "Le champ mot de passe est vide";
    }

    return errors;
  };

  return (
    <form noValidate onSubmit={handleSubmit} method="POST">
      <div>
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          name="email"
          isRequired={true}
        />
        {errors.email && <Text text={errors.email} type="small" propriety="small__red-error"/>}
      </div>
      <div>
        <Input
          type="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          name="password"
          isRequired={true}
        />
        {errors.password && <Text text={errors.password} type="small" propriety="small__red-error"/>}
      </div>
      {errors.login && <Text text={errors.login} type="small" propriety="small__red-error"/>}
      <Link text="Mot de passe oublié ?" type="reset" link="/reset-password"/>
      <Button type="submit" text="Se connecter" />
    </form>
  );
};

export default LoginForm;
