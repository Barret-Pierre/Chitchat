import { useState, useEffect } from "react";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import Text from "../../Atoms/Text/Text";
import axios from "axios";
import { io } from "socket.io-client";
import "./ParamForm.css";
import { useNavigate } from "react-router-dom";
import Modal from "../../Modal";

const ParamForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [socket, setSocket] = useState(null);
  const [errors, setErrors] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setSocket(io("http://localhost:4080"));
  }, []);

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
        errors.confirmPassword = "Les mots de passe ne sont pas identiques";
      }
    } else if (!data.confirmPassword.trim() && !data.password.trim()) {
      // //
    } else {
      errors.confirmPassword = "Veuillez confirmer votre mot de passe";
    }

    return errors;
  };
  useEffect(() => {
    if (isUpdated) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setIsUpdated(false);
    }
  }, [isUpdated]);

  const updateUser = async (formData) => {
    const updatedData = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] && key !== "confirmPassword") {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    const updatedUser = { ...user, ...updatedData };
    // TODO: envoyer la nouvelle donnée vers le backend

    await axios({
      method: "put",
      url: `http://localhost:4000/api/users/${user.id}`,
      data: updatedUser,
    })
      .then((res) => {
        console.log("res", res);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsUpdated(true);
        window.location.reload();
      })
      .catch((err) => {
        console.log("err", err);
      });
    console.log("Utilisateur mis à jour :", updatedUser);
  };

  const deleteUser = async () => {
    await axios({
      method: "delete",
      url: `http://localhost:4000/api/users/${user.id}`,
    })
      .then((res) => {
        console.log("res", res);
        socket.emit("userDeleted");
        localStorage.clear();
        navigate("/sign_up", { replace: true });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Modal
        isOpen={modalOpen}
        onDelete={() => deleteUser()}
        onCancel={() => setModalOpen(false)}
      />
      <div className="containerDiv">
        <div className="inputContainer">
          <div>
            <Input
              type="text"
              placeholder="Changer votre Nom et Prénom"
              value={formData.full_name}
              onChange={handleChange}
              name="full_name"
              isRequired={false}
            />
            {errors.full_name && (
              <Text
                text={errors.full_name}
                type="small"
                propriety="small__red-error"
              />
            )}
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
            {errors.email && (
              <Text
                text={errors.email}
                type="small"
                propriety="small__red-error"
              />
            )}
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
              <Text
                text={errors.confirmPassword}
                type="small"
                propriety="small__red-error"
              />
            )}
          </div>
        </div>
        <div className={"buttonDiv"}>
          <Button type="submit" text="Enregistrer" onClick={updateUser} />
          <p className="button__delete" onClick={() => setModalOpen(true)}>
            Supprimer
          </p>
          {isUpdated && (
            <Text text="Les informations ont été modifiées" type="small" />
          )}
        </div>
      </div>
    </form>
  );
};

export default ParamForm;
