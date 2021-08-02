// {
//     type:'ADD_MOVIES',
//     movies:[m1, m2, m3]
// }
// {
//     type:'DECREASE_COUNT'
// }

/* ACTION TYPES */
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';
export const REMOVE_FROM_FAVOURITES = 'REMOVE_FROM_FAVOURITES';
export const SET_SHOW_FAVOURITES = 'SET_SHOW_FAVOURITES';
export const ADD_MOVIE_TO_LIST='ADD_MOVIE_TO_LIST';
export const ADD_SEARCH_RESULT='ADD_SEARCH_RESULT';

/* THESE FUNCTIONS ARE CALLED ACTION CREATORS */
export function addMovies(movies)
{
    return {
        type: ADD_MOVIES,
        movies//this is the shorthand to write movies:movies
    }
}

export function addFavourites(movie)
{
    return {
        type: ADD_TO_FAVOURITES,
        movie
    }
}
export function removeFromFavourites(movie)
{
    return {
        type: REMOVE_FROM_FAVOURITES,
        movie
    };
}

export function setShowFavourites(val)
{
    return {
        type: SET_SHOW_FAVOURITES,
        val
    }
}

export function addMovieToList(movie)
{
    return {
        type:ADD_MOVIE_TO_LIST,
        movie
    }
}

export function handleMovieSearch(movie)
{
    const url = `https://www.omdbapi.com/?t=${movie}&apikey=eb9227a5`;

    return function (dispatch)
    {
        fetch(url)
            .then(response => response.json())
            .then(movie =>
            {
                //dispatch an action
                //{type:ADD_SEARCH_RESULT, movie}
                dispatch(addMovieSearchResult(movie));
            });
    };
}

export function addMovieSearchResult(movie)
{
    return {
        type:ADD_SEARCH_RESULT,
        movie
    }
}