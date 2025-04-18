import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './favoritos.css'
import { toast } from "react-toastify";

import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from "../../contexts/AuthContext";

function Favoritos(){
    const [filmes, setFilmes] = useState([]);
    const [series, setSeries] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
          }

        async function loadFilmes() {
        const movieRef = collection(db, `users/${user.uid}/movies-list`);

        await getDocs(movieRef)
        .then((snapshot) => {
            let listaFilmes = [];

            snapshot.forEach((doc) => {
                listaFilmes.push({
                    filme: doc.data().filme,
                    id: doc.id,                
                })
            })

            setFilmes(listaFilmes);
        })  
        }
        loadFilmes();

        async function loadSeries(){
            const seriesRef = collection(db, `users/${user.uid}/series-list`);

            await getDocs(seriesRef)
            .then((snapshot) => {
                let listaSeries = [];

                snapshot.forEach((doc) => {
                    listaSeries.push({
                        serie: doc.data().serie,
                        id: doc.id,
                    })
                })

                setSeries(listaSeries);
            })
        }
        loadSeries();
    },[removeFilme, removeSerie, user, navigate]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function removeFilme(idFilme){
        try {
            await deleteDoc(doc(db, `users/${user.uid}/movies-list/${idFilme}`));
            toast.success("Filme removido com sucesso!");
        }
        catch (error) {
            console.log("seguinte erro ao tentar remover o filme: " + error);
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function removeSerie(idSerie){
        console.log(idSerie)
            try {
                await deleteDoc(doc(db, `users/${user.uid}/series-list/${idSerie}`));
                toast.success("Filme removido com sucesso!");
            }
            catch (error) {
                console.log("seguinte erro ao tentar remover o filme: " + error);
            }
    }

    return(
        <div className="favoritos">
            <h1>Meus Filmes</h1>
            {filmes.length === 0 && <span className="alert">Você não possui nenhum filme salvo!</span>}
            
            <ul>
                {filmes.map((filme) => {
                    return(
                        <div key={filme.filme.id} className="favoritos-lista">
                            <div className="conteudo">
                                <img src={`http://image.tmdb.org/t/p/original/${filme.filme.backdrop_path}`} alt="" />
                                <div className="info">
                                    <div className="title">
                                        <span>{filme.filme.title} </span>
                                    </div>
                                    <div className="buttons">
                                        <Link to={`/filme/${filme.filme.id}`}>Ir ao Filme</Link>
                                        <button onClick={() => removeFilme(filme.id)} >Remover</button>
                                    </div>    
                                </div>
                            </div>
                        </div> 
                    )
                })}
            </ul>

            <h1>Minhas Séries</h1>
            {series.length === 0 && <span className="alert">Você não possui nenhunha série salva!</span>}
            
            <ul>
                {series.map((serie) => {
                    return(
                        <div className="favoritos-lista">
                            <li key={serie.serie.id}>
                                <div className="conteudo">
                                    <img src={`http://image.tmdb.org/t/p/original/${serie.serie.backdrop_path}`} alt="" />
                                    <div className="info">
                                        <div className="title">
                                            <span>{serie.serie.original_name} </span>
                                        </div>
                                        
                                        <div className="buttons">
                                            <Link to={`/serie/${serie.serie.id}`}>Ir a Série</Link>
                                            <button onClick={() => removeSerie(serie.id)}>Remover</button>
                                        </div>          
                                    </div>
                                </div>     
                            </li>
                        </div> 
                    )
                })}
            </ul>
            
                   
        </div>
    )
}

export default Favoritos;
