import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './movie-sub-card.scss';

export class MovieSubCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (

      <div className="movie-sub-card">

        <img className="movie-sub-card-img" variant="top" src={movie.ImagePath} />

        <Link className="movie-sub-card-title" to={`/movies/${movie._id}`}>
          {movie.Title}
        </Link>

      </div>
    );
  }
}

MovieSubCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }),

};
