import { Link, useNavigate } from 'react-router-dom';
import './styleRegister.css';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';

function Register(){
    const { register } = useAuth();
    const navigate = useNavigate();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const closeMenuRegister = <X />;

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

            <div className="block-register">

                <div className="close">
                    <button className='closeMenuRegister' onClick={() => navigate('/')}>{closeMenuRegister}</button>
                </div>

                <div className="left">
                    
                </div>

                <div className="right">
                    <h1>Registre-se</h1>
                    <form onSubmit={handleRegister}>
                        <label>Email</label><br />
                        <input
                            required
                            type="email" 
                            placeholder="Digite seu email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        /> <br />

                        <label>Senha</label><br />
                        <input 
                            required
                            type="password" 
                            placeholder="Digite sua senha" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        /> 

                        <button className='submit' type="submit">Cadastrar</button>
                    </form>

                    <div className="login">
                        <p>Já tem uma conta? </p>
                        <Link to="/Login">Faça login</Link>
                    </div>
                    
                </div>
                
            </div>
            
        </div>
    )
}

export default Register;