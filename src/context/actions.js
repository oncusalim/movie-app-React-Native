import axios from 'axios';
import { API_KEY } from "@env";


export const getMovieCategories = (language) => dispatch => {

    axios
        .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${language}`)
        .then(res =>
            dispatch({ type: "GET_FILM_CATEGORIES", payload: res.data.genres }))
        .catch(err =>
            dispatch({ type: "CATEGORIES_ERROR", payload: err }))
}

export const getTvCategories = (language) => dispatch => {

    axios
        .get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=${language}`)
        .then(res =>
            dispatch({ type: "GET_TV_CATEGORIES", payload: res.data.genres }))
        .catch(err =>
            dispatch({ type: "CATEGORIES_ERROR", payload: err }))
}