import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import './series.css'
import { toast } from "react-toastify";

import { db } from '../../services/firebase';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { useAuth } from "../../contexts/AuthContext.jsx";

function Serie(){
    const {id} = useParams();
    const [serie, setSerie] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { user, login } = useAuth();

    useEffect(() => {
        async function loadSerie() {
            await api.get(`/tv/${id}`,{
                params:{
                    api_key: "db744f0ab09663b7c3961c079759a65b",
                
                }
            }) 
            .then((response) => {
                    setSerie(response.data);
                    setLoading(false);
            })
            .catch(() => {
                console.log('Deu errado :(')
                navigate(`/serie/${serie.id}`, {replace: true})
                return;
            })
            
        }
        
        loadSerie();

    }, [navigate, id]);

    async function salvarSerie(){
        if(!user) {
            toast.warn("Você precisa estar logado para salvar uma serie!");
            await login();
            return;         
        }

        try{
            await setDoc(doc(db, `users/${user.uid}/series-list/${id}`), {
                serie: serie,
            })
            toast.success("Serie salva com sucesso!");
        }
        catch (error) {
            toast.error("Erro ao salvar a serie!");
            console.error("Error saving the series:", error);
        }
        
    }
    
    if(loading){
        <div className="serie-info">
            <h1>Carregando detalhes...</h1>
        </div>
    }

    return(
        <div className="container-serie" id="container-serie">
            <div className="imgfundo">
                <img src={`http://image.tmdb.org/t/p/original/${serie.backdrop_path}`} alt="" />
            </div>
            <div className="informacoes"> 
                <div className="itens">
                    <h1>{serie.name}</h1> <br />
                    <h3>Sinopse:</h3> 
                    <p>{serie.overview}</p><br />
                    <strong>{`Nota: ${Number(serie.vote_average).toFixed(1)} / 10`}</strong> <br />
                    <div className="area-butons">

                        <a onClick={salvarSerie}>Salvar</a>       
                        <a href={`http://youtube.com/results?search_query=trailer ${serie.name}`} target="blank"  rel="external">
                            Trailer
                        </a>
                
                    </div> 
                </div>
                <img src={`http://image.tmdb.org/t/p/original/${serie.poster_path}`} alt="" />  
            </div>
        </div>
    )
}

export default Serie;
