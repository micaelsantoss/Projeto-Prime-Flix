import { Link,  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './style.css';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

function Header(){
    const [query, setQuery] = useState();
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        let buttonSign = document.querySelector('.login-register');

        if(user){
            buttonSign.style.display = 'none';
        }else{
            buttonSign.style.display = 'block';
        }
    },[user])

    const handleLogout = async () => {
        await logout();
        navigate('/');

        toast.success('Você desconectou!')
    }

    function valueSearch(){
        if(query == ''){
            toast.warn("Por favor, digite o filme desejado.");  
        } else {
            localStorage.setItem('@value-search', JSON.stringify(query));
            setQuery('');
            navigate('/Search');
        }   
    }

    function hideMenu(){
        let menuHamburguer = document.getElementById('menu-hamburguer');
        let buttons = document.getElementById('buttons');
        let buttonHamburguer = document.getElementById('button-hamburguer');

        menuHamburguer.classList.toggle("active");
        buttons.classList.toggle("active-button");
        buttonHamburguer.classList.toggle("active-button-hamburguer");
    }

    const handleChange= (e) => {
        setQuery(e.target.value);
    };
    
    return(
        <header>
            <div id='menu-hamburguer' className='menu-hamburguer'>
            </div>
            <button id='button-hamburguer' className='button-hamburguer' onClick={hideMenu}>H</button>
            
            <Link className='logo' to='/'>Prime Flix</Link>
            <div className='blocodireita'>
                <div className="search">                            
                    <form >
                        <input 
                            id='value-search' 
                            className='value-search' 
                            type="text" 
                            name='search' 
                            placeholder='Pesquisar'
                            onChange={handleChange}
                            value={query}
                        />
                            
                        <a className='button-search' type='submit' onClick={valueSearch}>Buscar</a>                 
                    </form>                     
                </div>
                <div id='buttons' className="buttons">
                    <Link className='favoritos' to='/Favoritos'>Minha Lista</Link >
                    <Link className='login-register' to='/Login'>Conecte-se</Link> 
                    {user && (
                        <a className='button-logout' onClick={handleLogout}>Sair</a>
                    )}
                </div>
                 
            </div>
        </header>
    )
}

export default Header;