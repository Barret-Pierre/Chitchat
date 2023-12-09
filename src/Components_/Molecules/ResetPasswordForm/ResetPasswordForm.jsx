import { useState } from 'react';
import Input from '../../Atoms/Input/Input';
import Button from '../../Atoms/Button/Button';
import Text from '../../Atoms/Text/Text';
import { useNavigate } from 'react-router-dom';

const ResetPasswordForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showResetButton, setShowResetButton] = useState(true);

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validateEmail = (data) => {
    const errors = {};

    if (data === '') {
      errors.email = "Le champ email est vide";
    } else if (!isValidEmail(data)) {
      errors.email = "L'adresse email n'est pas valide";
    }

    return errors;
  };

  const validatePassword = (password, confirmPassword) => {
    const errors = {};

    if (password === '') {
      errors.password = "Le champ mot de passe est vide";
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = 'Veuillez confirmer votre mot de passe';
    }

    if (password.trim() && confirmPassword.trim()) {
      if (password !== confirmPassword) {
        errors.confirmPassword = 'Les mots de passe ne sont pas identiques';
      }
    }

    return errors;
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const emailErrors = validateEmail(email);
    setErrors(emailErrors);
    setSubmitted(true);

    if (Object.keys(emailErrors).length === 0) {
      const userExists = checkUserExists(email);
      if (userExists) {
        setShowPasswordFields(true);
        setShowResetButton(false);
      } else {
        setErrors({ email: "Aucun compte n'existe avec cette email" });
      }
    }
  };

  const handleSubmitNewPassword = (e) => {
    e.preventDefault();
    const passwordErrors = validatePassword(password, confirmPassword);
    setErrors(passwordErrors);

    if (Object.keys(passwordErrors).length === 0) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrors({});
      setSubmitted(false);
      setShowPasswordFields(false);
      setShowResetButton(true);
      navigate('/'); 
    }
  };

  const checkUserExists = (email) => {
    const users = [
      { email: 'test@example.com' },
    ];
    return users.some(user => user.email === email);
  };

  return (
    <>
      <form noValidate onSubmit={handleResetPassword} method="POST">
        <div>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            isRequired={true}
          />
          {submitted && errors.email && <Text text={errors.email} type="small" propriety="small__red-error"/>}
        </div>
        {showResetButton && (
          <Button type="submit" text="Réinitialiser le mot de passe" />
        )}
      </form>

      {showPasswordFields && (
        <form noValidate onSubmit={handleSubmitNewPassword} method="POST">
          <div>
            <Input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              isRequired={true}
            />
            {errors.password && <Text text={errors.password}  type="small" propriety="small__red-error"/>}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
              isRequired={true}
            />
            {errors.confirmPassword && <Text text={errors.confirmPassword}  type="small" propriety="small__red-error"/>}
          </div>
          <Button type="submit" text="Valider" />
        </form>
      )}
    </>
  );
};

export default ResetPasswordForm;
