import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { login } from "../../service/requestUser";

function Connexion() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Gère les changements dans les champs du formulaire
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Gère la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await login(formData);
      if(res.code==204){
        navigate("/dashboard");
      }
    } catch (error) {
      console.error('Erreur de connexion :', error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full h-[90vh] flex flex-col justify-center items-center border"
      >
        <label htmlFor="email">Entrer votre email :</label>
        <input
          value={formData.email}
          onChange={handleChange}
          type="email"
          name="email"
          required
          className="mb-4 p-2 border rounded"
        />

        <label htmlFor="password">Entrer votre mot de passe :</label>
        <input
          value={formData.password}
          onChange={handleChange}
          type="password"
          name="password"
          required
          className="mb-4 p-2 border rounded"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
        >
          Envoyer
        </button>
      </form>
      {/* Footer */}
      <footer className="p-4 text-center text-sm text-gray-500 bg-gray-100">
          © {new Date().getFullYear()} Marcus Favernay. Tous droits réservés.
          <ul>
              <li><Link to="/">Page d'accueil</Link></li>
          </ul>
      </footer>
    </>
  );
}

export default Connexion;
