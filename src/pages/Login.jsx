import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login(){
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const {login} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if(userName==="testuser" && password==="Test123"){
            login();
            navigate("/list")
        }else{
            alert("Invalid Credentials!!!");
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={userName} onChange={(e)=>setUserName(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>

        </div>
    );

};

export default Login;