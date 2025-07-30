import { useState } from "react";

function Connexion(){

    const[email, setEmail] = useState();

    const[password, setPassword] = useState();

    const handleEmail = async () =>{
        setEmail();
    }

    return(<>
    <form action="#" method="GET" className="w-full h-[90vh] flex flex-col justify-center items-center border">
        <label htmlFor="email">Entrer votre email:</label>
        <input type="text" name="email" />
        <label htmlFor="password">Entrer votre mot de passe:</label>
        <input type="text" name="password"/>
        <button>Envoyer</button>
    </form>
    </>);

}

export default Connexion;