import ResetPasswordForm from "../Molecules/ResetPasswordForm/ResetPasswordForm";
import Text from "../Atoms/Text/Text";
import Link from "../Atoms/Link/Link";

const ResetPassword = () => {

  return (
    <>
      <Text text="Mot de passe oublié ? 🤔"/>
      <Text text="Entrez votre email"/>
      <ResetPasswordForm />
      <Text text="Vous n'avez pas de compte?"/>
      <Link text="S'inscrire"  type="signup" link="/signup"/>
    </>
  )
}

export default ResetPassword;