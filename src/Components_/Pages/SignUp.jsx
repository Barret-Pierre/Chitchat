import SignUpForm from "../Molecules/SignUpForm/SignUpForm";
import Text from "../Atoms/Text/Text";
import Link from "../Atoms/Link/Link";

const SignUp = () => {

  return (
    <>
      <Text text="Bienvenue 👋"/>
      <Text text="Complétez vos informations"/>
      <SignUpForm />
      <Text text="Déjà inscrit ?"/>
      <Link text="Se connecter"  type="signin" link="/"/>
    </>
  )
}

export default SignUp;