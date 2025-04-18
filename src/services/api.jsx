// link base: 'https://api.themoviedb.org/3
// chave api: db744f0ab09663b7c3961c079759a65b
// Filmes do momento: movie/now_playing?api_key=db744f0ab09663b7c3961c079759a65b&language=en-US&page=1

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export default api;