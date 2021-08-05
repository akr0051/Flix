import React from 'react';
import { connect } from 'react-redux';
import { MovieCard } from '../movie-card/movie-card';
import './movies-list.scss';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div className="main-view" />;

    return <div className="movie-list-grid">
        
        {filteredMovies.map(m => (
        <div>
            <MovieCard movie={m} />
        </div>
    ))}
   </div>; 
}

export default connect(mapStateToProps)(MoviesList);