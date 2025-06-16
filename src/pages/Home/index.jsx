import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import api from "../../services/api";
import "./home.css";

function Home(){
    const [filmesEmAlta, setFilmesEmAlta] = useState([]);
    const [filmesPopulares, setFilmesEmAltaPopulares] = useState([]);
    const [filmesAcao, setFilmesAcao] = useState([]);
    const [filmesFiccaoCientifica, setFilmesFiccaoCientifica] = useState([]);
    const [series, setSeries] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState([]);

    useEffect(() => {
        
        async function loadFilmesEmAlta() {
            const response = await api.get("movie/now_playing",{
                params:{
                    api_key: "db744f0ab09663b7c3961c079759a65b",
                    language: "pt-BR",
                    page: 1,
                }
            })

            setFilmesEmAlta(response.data.results.slice(0, 20));
        }

        loadFilmesEmAlta();

        async function loadFilmesPopulares() {
            const response = await api.get("/movie/popular", {
                params:{
                    api_key: "db744f0ab09663b7c3961c079759a65b",
                    language: "pt-BR",
                    page: 1,
                }
            })

            setFilmesEmAltaPopulares(response.data.results.slice(0, 20));
        }

        loadFilmesPopulares();

        async function loadFilmesAcao() {
            const response = await api.get("/discover/movie", {
                params:{
                    api_key: "db744f0ab09663b7c3961c079759a65b",
                    language: "pt-BR",
                    with_genres: 28,
                    page: 1,
                }
            })

            setFilmesAcao(response.data.results.slice(0, 20));
        }

        loadFilmesAcao();

        async function loadFilmesFiccaoCientifica() {
            const response = await api.get("/discover/movie", {
                params:{
                    api_key: "db744f0ab09663b7c3961c079759a65b",
                    language: "pt-BR",
                    with_genres: 878,
                    page: 1,
                }
            })

            setFilmesFiccaoCientifica(response.data.results.slice(0, 20));
        }

        loadFilmesFiccaoCientifica();

        async function loadSeries() {
            const response = await api.get("/tv/popular", {
                params:{
                    api_key: "db744f0ab09663b7c3961c079759a65b",
                    page: 1,
                }
            })

            setSeries(response.data.results.slice(0, 20));
        }

        loadSeries();

       

    }, []);

    return(

        
        <div className="container">

            <div className="slide-principal">
                <Swiper
                    speed={1000} 
                    slidesPerView={1}      
                    loop={true}
                    autoplay={{
                        delay: 5000, 
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }} 
                    
                > 
                    {filmesEmAlta.map((filme, index) => {
                        return(
                            <SwiperSlide key={filme.id}>
                                <article 
                                    id="slide-item" key={filme.id} 
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <img 
                                        src={`http://image.tmdb.org/t/p/original/${filme.backdrop_path}`} 
                                        className={hoveredIndex === index ? "darkened" : ""}
                                    />
                                    <div className={hoveredIndex === index ? "info-block" : ""}>
                                        <h2>{filme.title}</h2>
                                        <p>{filme.overview}</p>
                                        <Link to={`/filme/${filme.id}`}>Acessar</Link>
                                    </div>
                                </article>
                            </SwiperSlide> 
                        )
                        
                    })}
                </Swiper>
            </div>

            
            <div className="lista-filmes">
            <h1 className="title">Em Alta</h1>
                <Swiper          
                    loop={true}
                    breakpoints={{
                        1024:{
                            slidesPerView: 7
                        }, 768:{
                            slidesPerView: 6
                        }, 300:{
                            slidesPerView: 3
                        }
                    }}
                > 
                    {filmesEmAlta.map((filme) => {
                        return(
                            <SwiperSlide key={filme.id}>
                                    <article key={filme.id}>
                                        <img src={`http://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                                        <Link to={`/filme/${filme.id}`}>Acessar</Link>
                                    </article>
                            </SwiperSlide> 
                        )
                        
                    })}
                </Swiper>
            </div>
            
            <div className="lista-filmes">
            <h1 className="title">Populares</h1>
                <Swiper     
                   loop={true}
                   breakpoints={{

                       1024:{
                           slidesPerView: 7
                       }, 768:{
                           slidesPerView: 6
                       }, 300:{
                           slidesPerView: 3
                       }
                    }}
                > 
                    {filmesPopulares.map((filme) => {
                        return(
                            <SwiperSlide key={filme.id}>
                                    <article key={filme.id}>
                                        <img src={`http://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                                        <Link to={`/filme/${filme.id}`}>Acessar</Link>
                                    </article>
                            </SwiperSlide> 
                        )
                        
                    })}
                </Swiper>
            </div>

            <div className="lista-filmes">
            <h1 className="title">Ação</h1>
                <Swiper   
                    loop={true}
                    breakpoints={{
                        1024:{
                            slidesPerView: 7
                        }, 768:{
                            slidesPerView: 6
                        }, 300:{
                            slidesPerView: 3
                        }
                    }}
                > 
                    {filmesAcao.map((filme) => {
                        return(
                            <SwiperSlide key={filme.id}>
                                    <article key={filme.id}>
                                        <img src={`http://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                                        <Link to={`/filme/${filme.id}`}>Acessar</Link>
                                    </article>
                            </SwiperSlide> 
                        )
                        
                    })}
                </Swiper>
            </div>

            <div className="lista-filmes">
            <h1 className="title">Ficcao Cientifica</h1>
                <Swiper  
                    loop={true}
                    breakpoints={{
                        1024:{
                            slidesPerView: 7
                        }, 768:{
                            slidesPerView: 6
                        }, 300:{
                            slidesPerView: 3
                        }
                    }}
                > 
                    {filmesFiccaoCientifica.map((filme) => {
                        return(
                            <SwiperSlide key={filme.id}>
                                    <article key={filme.id}>
                                        <img src={`http://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                                        <Link to={`/filme/${filme.id}`}>Acessar</Link>
                                    </article>
                            </SwiperSlide> 
                        )
                        
                    })}
                </Swiper>
            </div>

            <div className="lista-filmes">
            <h1 className="title">Séries</h1>
                <Swiper  
                    loop={true}
                    breakpoints={{
                        1024:{
                            slidesPerView: 7
                        }, 768:{
                            slidesPerView: 6
                        }, 300:{
                            slidesPerView: 3
                        }
                    }}
                > 
                    {series.map((serie) => {
                        return(
                            <SwiperSlide key={serie.id}>
                                    <article key={serie.id}>
                                        <img src={`http://image.tmdb.org/t/p/original/${serie.poster_path}`} alt={serie.original_name} />
                                        <Link to={`/serie/${serie.id}`}>Acessar</Link>
                                    </article>
                            </SwiperSlide> 
                        )
                        
                    })}
                </Swiper>
            </div>
        </div>     
    )
}

export default Home;