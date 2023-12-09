import LoginForm from "../Molecules/LoginForm/LoginForm";
import Text from "../Atoms/Text/Text";
import Link from "../Atoms/Link/Link";

const Home = () => {

  return (
    <>
      <Text text="Ravi de vous revoir 😊"/>
      <Text text="Complétez vos informations"/>
      <LoginForm />
      <Text text="Vous n’avez pas de compte ?"/>
      <Link text="S'inscrire" type="signup" link="/signup"/>
    </>
  )
}

export default Home;