import { Link } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import './style.css'
import { toast } from 'react-toastify';
import { useState } from 'react';

function Login(){
    const { login, loginNormal } = useAuth();
    const navigate = useNavigate();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleLogin = async () => {
        await login();
        navigate('/');

        toast.success('Conectado com sucesso!')
    }

    const handleLoginNormal = async (e) => {
        e.preventDefault();

        try{
            await loginNormal (email, password);
            toast.success('Conectado com sucesso!')
            navigate('/');
        } catch (err) {
            if (err.code === "auth/user-not-found") {
                toast.error("Este e-mail não está cadastrado.");
              } else if (err.code === "auth/wrong-password") {
                toast.error("Senha incorreta. Tente novamente.");
              } else if (err.code === "auth/invalid-credential") {
                toast.error("E-mail não existe.");
              } else {
                toast.error("Erro ao fazer login: " + err.message);
              }  
        }
    }

    return(
        <div className="container-login">
            
            <div className="block-login">
                <button className='close' onClick={() => navigate(-1)}>Fechar</button>
                <h1>Entrar</h1>
                <form onSubmit={handleLoginNormal}>
                    <label>Email</label>
                    <input
                        required
                        type="email" 
                        placeholder="Digite seu email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /> <br />

                    <label>Senha</label>
                    <input 
                        required
                        type="password" 
                        placeholder="Digite sua senha" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /> <br />

                    <button type="submit">Entrar</button>
                </form>

                <p>Ainda não tem uma conta? <Link to="/Register">Registre-se agora</Link></p>

                <button onClick={handleLogin}>Entre com o google</button><br />
            </div>
            
        </div>
    )
}

export default Login;