import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './search.css';
import api from "../../services/api";

function Search(){
    const [search, setSearch] = useState([])

    useEffect(() => {
        const valueSearch = localStorage.getItem('@value-search');

        Search(valueSearch);

        async function Search(valueSearch){
            const response = await api.get('/search/movie', {
                params: {
                    api_key: "db744f0ab09663b7c3961c079759a65b",
                    query: valueSearch,
                    language: "pt-BR",
                    page: 1,
                }
            })
            
            setSearch(response.data.results.slice(0, 10));
           
        }

}, [])

    return(
        
        <div className="container-search">

            <div className="lista-filmes-search">
        
                {search.map((filme) => {
                    return(
                        
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`http://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                        
                    )
                    
                })}
                    
            </div>
        </div>
    )
}

export default Search;