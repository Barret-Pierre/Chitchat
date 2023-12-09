import { useState } from 'react';
import Input from '../../Atoms/Input/Input';
import Button from '../../Atoms/Button/Button';
import Text from '../../Atoms/Text/Text';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const existingUser = checkExistingUser(formData.email);
      if (existingUser) {
        setErrors({ email: 'Un compte existe déjà avec cette adresse email' });
      } else {
        const newUser = {
          userName: formData.userName,
          ...formData,
        };
        navigate(`/chat/${newUser.userName}`);
      }
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (data.userName.trim() === '') {
      errors.userName = 'Le champ nom complet est vide';
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(data.email)) {
      errors.email = "L'adresse email n'est pas valide";
    }
    if (data.password.trim() === '') {
      errors.password = 'Le champ mot de passe est vide';
    }

    return errors;
  };

  const checkExistingUser = (email) => {
  // TODO: À remplacer par une requête vers le backend
  const existingUsers = [
      { email: 'test@example.com', password: 'test123', userName: 'username' },
    ];
    return existingUsers.find((user) => user.email === email);
  };

  return (
    <form noValidate onSubmit={handleSubmit} method="POST">
      <div>
        <Input
          type="text"
          placeholder="Prénom et Nom"
          value={formData.userName}
          onChange={handleChange}
          name="userName"
          isRequired={true}
        />
        {errors.userName && <Text text={errors.userName} type="small" propriety="small__red-error"/>}
      </div>
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
      <Button type="submit" text="S'inscrire" />
    </form>
  );
};

export default SignUpForm;
