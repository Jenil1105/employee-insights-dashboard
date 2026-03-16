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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm border border-gray-200">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Employee Dashboard Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={userName} 
                    onChange={(e)=>setUserName(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
            
                <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition">Login</button>
            </form>
                
            </div>

        </div>
    );

};

export default Login;