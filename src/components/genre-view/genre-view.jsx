import React from 'react';
import PropTypes from 'prop-types';
import { MovieSubCard } from '../movie-sub-card/movie-sub-card';

export class GenreView extends React.Component {
  render() {
    const { movies, genre, onBackClick } = this.props;

    return (
      <div className="card">

        <div className="card-title">{genre.Name}</div>

        <div className="card-label">DESCRIPTION</div>
        <div className="card-desc">{genre.Description}</div>

        <div className="line" />

        <div className="other-movies-label">
          Other {' '}
          {genre.Name}
          {' '}
          movies
        </div>

        <div className="movie-sub-list-grid">
          {
                        movies
                          .filter((m) => m.Genre.Name === genre.Name)
                          .map((m) => (
                            <div key={m}>
                              <MovieSubCard movie={m} />
                            </div>
                          ))
                        }
        </div>

        <button className="close-btn" onClick={() => onBackClick()} type="submit">X</button>

      </div>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
  }).isRequired,
};
