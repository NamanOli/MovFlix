import React from "react";
import {connect} from 'react-redux';
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { data } from '../data';
import { addMovies, setShowFavourites } from '../actions'

class App extends React.Component
{
    componentDidMount()
    {
        //make api call
        //dispatch action
        this.props.dispatch(addMovies(data));
    }
    isMovieFavourite = (movie) =>
    {
        const { movies } = this.props;
        const { favourites } = movies;
        const index = favourites.indexOf(movie);
        if (index !== -1)//we have found the movie
            return true;
        else
            return false;
    }
    onChangeTab = (val) =>
    {
        this.props.dispatch(setShowFavourites(val))
    }
    render()
    {
        const { movies } = this.props;
        const { list, favourites, showFavourites } = movies;
        const displayMovies = showFavourites ? favourites : list;

        return (
            <div className="App">
                <Navbar
                /* dispatch={this.props.store.dispatch}
                search={search} */
                />
                <div className="main">
                    <div className="tabs">
                        <div className={`tab ${!showFavourites ? 'active-tabs' : ''}`} onClick={() => { this.onChangeTab(false) }}>Movies</div>
                        <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() => { this.onChangeTab(true) }}>Favourites</div>
                    </div>
                    <div className="list">
                        {displayMovies.map((movie, index) => (
                            <MovieCard
                                movie={movie}
                                key={`movies${index}`}
                                dispatch={this.props.dispatch}
                                isFavourite={this.isMovieFavourite(movie)}
                            />
                        ))}
                    </div>
                    {displayMovies.length === 0 ? <div className="no-movies">No Movies to show!</div> : null}
                </div>
            </div>
        );
    }
}

// class AppWrapper extends React.Component
// {
//     render()
//     {
//         return(
//             <StoreContext.Consumer>
//                 {(store)=>
//                 {
//                     return (
//                         <App store={store}/>
//                     )
//                 }}
//             </StoreContext.Consumer>
//         )
//     }
// }


function mapStateToProps(state)
{
    return {
        movies: state.movies,
        search: state.search
    }
}

const ConnectedAppComponent = connect(mapStateToProps)(App);

export default ConnectedAppComponent;
