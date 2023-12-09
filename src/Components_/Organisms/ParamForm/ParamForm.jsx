import { useState, useEffect } from 'react';
import Input from '../../Atoms/Input/Input';
import Button from '../../Atoms/Button/Button';
import Text from '../../Atoms/Text/Text';

const ParamForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);


  const user = {
    email: 'test@example.com',
    password: 'test123',
    userName: 'username',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      updateUser({ ...formData });
      setIsUpdated(true); 
    }
  };

  useEffect(() => {
    let timeout;
    if (isUpdated) {
      timeout = setTimeout(() => {
        setIsUpdated(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isUpdated]);

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validateForm = (data) => {
    const errors = {};

    if (data.email && !isValidEmail(data.email)) {
      errors.email = "L'adresse email n'est pas valide";
    }
    if (data.password.trim() && data.confirmPassword.trim()) {
      if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Les mots de passe ne sont pas identiques';
      }
    } else if (!data.confirmPassword.trim() && !data.password.trim()) {
      // //
    } else {
      errors.confirmPassword = 'Veuillez confirmer votre mot de passe';
    }

    return errors;
  };

  const updateUser = (formData) => {
    const updatedData = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] && key !== 'confirmPassword') {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    const updatedUser = { ...user, ...updatedData };
    // TODO: envoyer la nouvelle donnée vers le backend
    console.log('Utilisateur mis à jour :', updatedUser);
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div>
        <Input
          type="text"
          placeholder="Changer votre Nom et Prénom"
          value={formData.userName}
          onChange={handleChange}
          name="userName"
          isRequired={false}
        />
        {errors.userName && <Text text={errors.userName} type="small" propriety="small__red-error"/>}
      </div>
      <div>
        <Input
          type="email"
          placeholder="Modifier votre mail"
          value={formData.email}
          onChange={handleChange}
          name="email"
          isRequired={false}
        />
        {errors.email && <Text text={errors.email} type="small" propriety="small__red-error"/>}
      </div>
      <div>
        <Input
          type="password"
          placeholder="Nouveau mot de passe"
          value={formData.password}
          onChange={handleChange}
          name="password"
          isRequired={false}
        />
      </div>
      <div>
        <Input
          type="password"
          placeholder="Confirmez votre nouveau mot de passe"
          value={formData.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
        />
        {formData.password.trim() && errors.confirmPassword && (
          <Text text={errors.confirmPassword} type="small" propriety="small__red-error"/>
        )}
      </div>
      <Button type="submit" text="Enregistrer" />
      
      {isUpdated && <Text text="Les informations ont été modifiées" type="small"/>}
    </form>
  );
};

export default ParamForm;
