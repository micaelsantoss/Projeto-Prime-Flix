import { Link, useNavigate } from 'react-router-dom';
import './style.css'
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import { toast } from 'react-toastify';

function Register(){
    const { register } = useAuth();
    const navigate = useNavigate();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await register(email, password);
            toast.success('Cadastro realizado com sucesso!');
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <div className="container-register">
            <h1>Cadastro</h1>
            <form onSubmit={handleRegister}>
                <label>Email</label>
                <input
                    required
                    type="email" 
                    placeholder="Digite seu email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Senha</label>
                <input 
                    required
                    type="password" 
                    placeholder="Digite sua senha" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Cadastrar</button>
            </form>

            <p>Já tem uma conta? <Link to="/Login">Faça login</Link></p>
        </div>
    )
}

export default Register;