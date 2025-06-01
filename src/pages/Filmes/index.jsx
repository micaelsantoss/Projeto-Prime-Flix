import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
import { db } from '../../services/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { useAuth } from "../../contexts/AuthContext.jsx";

import './filmes.css';

function Filme(){
    const { id } = useParams();
    const [filme, setFilme] = useState({});
    //const [trailer, setTrailer] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { user } = useAuth();

    useEffect(() => {
       /* async function carregarTrailer() {
            await api.get(`https://api.themoviedb.org/3/movie/1125899/videos?api_key=db744f0ab09663b7c3961c079759a65b&language=pt-BR&page=1"`, {
            })
            .then((response) => {
                setTrailer(response)
                console.log(response)
            })
            .catch(() => {
                alert('deu erro')
            })
        } 

        carregarTrailer(); */

        async function loadFilme() {
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "db744f0ab09663b7c3961c079759a65b",
                    language: "pt-BR",
                }
            }) 
            .then((response) => {
                    setFilme(response.data);
                    console.log(response)
                    setLoading(false);
            })
            .catch(() => {
                console.log('Deu errado :(')
                navigate(`/serie/${filme.id}`, {replace: true})
                return;
            })
            
        }
        
        loadFilme();

    }, [navigate, id]);

    
    async function salvarFilme(){
        if(!user) {
            toast.warn("Você precisa estar logado para salvar um filme!");
            navigate('/Login');
            return;         
        }else{
            try{
                await setDoc(doc(db, `users/${user.uid}/movies-list/${id}`), {
                    filme: filme,
                })
                
                toast.success("FILME SALVO COM SUCESSO");
            }
            catch (error){
                console.log("Gerou o seguinte erro: " + error);
            }
        }
    }
  
    if(loading){
        <div className="filme-info">
            <h1>Carregando detalhes...</h1>
        </div>
    }

    return(
        <div className="container-filme" id="container-filme">
            <div className="imgfundo">
                <img src={`http://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt="" />
            </div>
            <div className="informacoes"> 
                <div className="itens">
                    <h1>{filme.title}</h1> <br />
                    <h3>Sinopse:</h3> 
                    <p>{filme.overview}</p><br />
                    <strong>{`Nota: ${Number(filme.vote_average).toFixed(1)} / 10`}</strong> <br />
                    <div className="area-butons">

                        <a onClick={salvarFilme}>Salvar</a>       
                        <a href={`http://youtube.com/results?search_query=trailer ${filme.title}`} target="blank"  rel="external">
                            Trailer
                        </a>
                
                    </div> 
                </div>
                <img src={`http://image.tmdb.org/t/p/original/${filme.poster_path}`} alt="" />  
            </div>
        </div>
    )
    
}

export default Filme;

  /* <a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="blank"  rel="external">
                        Trailer
                    </a> */