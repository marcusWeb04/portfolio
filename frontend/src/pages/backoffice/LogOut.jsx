import { useEffect } from "react";
import { logOut } from "../../service/requestUser";
import { useNavigate } from "react-router";

function LogOut(){
    const navigate = useNavigate();
    useEffect(()=>{
        const handleRequest = async () => {
            await logOut();
            navigate("/");
        };
        handleRequest();
    },[]);
}

export default LogOut;