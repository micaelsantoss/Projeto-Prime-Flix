import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import './search.css';
import api from "../../services/api";

function Search(){
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const [search, setSearch] = useState([]);
    
    useEffect(() => {
        SearchMovie(query);

        async function SearchMovie(query){
            const response = await api.get('/search/movie', {
                params: {
                    api_key: "db744f0ab09663b7c3961c079759a65b",
                    query: query,
                    language: "pt-BR",
                    page: 1,
                }
            })
            
            setSearch(response.data.results.slice(0, 10));
           
        }

    }, [query])

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