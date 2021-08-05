import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaLongArrowAltRight } from 'react-icons/fa';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

      <Link to="/users">
        <button variant="link">My Profile</button>
      </Link>;

      return (

        <div className="movie-card">

          <div className="movie-title">{movie.Title}</div>

          <img className="movie-card-img" variant="top" src={movie.ImagePath} />

          <div className="movie-description">{movie.Description}</div>

          <div className="line-main" />

          <Link to={`/movies/${movie._id}`}>
            <div className="link-box">

              <FaLongArrowAltRight color="white" />

              <div className="link">
                Read More
              </div>

            </div>
          </Link>

        </div>
      );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }),

};
