import { Link,  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './style.css';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { AlignJustify, X, Search } from 'lucide-react';

function Header(){
    const [query, setQuery] = useState();
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const openMenu = <AlignJustify />;
    const closeMenu = <X />;
    const lupe = <Search />;

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

    function valueSearch(e){
        e.preventDefault();      
        if(!query.trim()){
            toast.warn("Por favor, digite o filme desejado.");  
        } else{ 
            navigate('/Search?q=' + query);
            setQuery('');
        }   
    }

    function hideMenu(){
        let menuHamburguer = document.getElementById('menu-hamburguer');
        let buttonsHeader = document.getElementById('buttons');
        let buttonHamburguer = document.getElementById('button-hamburguer');
        let openMenu = document.getElementById('open-menu');
        let closeMenu = document.getElementById('close-menu');

        menuHamburguer.classList.toggle("active-menu-hamburguer");
        buttonsHeader.classList.toggle("active-button-header");
        buttonHamburguer.classList.toggle("active-button-hamburguer");
        openMenu.classList.toggle("active-open-menu");
        closeMenu.classList.toggle("active-close-menu");
    }

    const handleChange= (e) => {
        setQuery(e.target.value);
    };
    
    return(
        <header>
            <div id='menu-hamburguer' className='menu-hamburguer'>
            </div>
            <button id='button-hamburguer' className='button-hamburguer' onClick={hideMenu}>
                <div id='open-menu' className='open-menu'>{openMenu}</div>
                <div id='close-menu' className='close-menu'>{closeMenu}</div>
            </button>
            
            <Link className='logo' to='/'>Prime Flix</Link>
            <div className='blocodireita'>
                <div className="search">                            
                    <form onSubmit={valueSearch}>
                        <input 
                         autoComplete='off'
                            id='value-search' 
                            className='value-search' 
                            type="text" 
                            name='search' 
                            placeholder='Pesquisar'
                            onChange={handleChange}
                            value={query}
                        />
                            
                        <button className='button-search' type='submit'>{lupe}</button>                 
                    </form>                     
                </div>
                <div id='buttons' className="buttons">
                    <Link onClick={hideMenu} className='favoritos' to='/Favoritos'>Favoritos</Link >
                    <Link onClick={hideMenu} className='login-register' to='/Login'>Login</Link> 
                    {user && (
                        <a className='button-logout' onClick={handleLogout}>Sair</a>
                    )}
                </div>
                 
            </div>
        </header>
    )
}

export default Header;