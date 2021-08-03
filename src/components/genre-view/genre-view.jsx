import React from 'react';
import PropTypes from 'prop-types';
import { DirectorView } from '../director-view/director-view'
import './genre-view.scss';

export class GenreView extends React.Component {
    render () {

        const { director, genre, onBackClick } = this.props;

        console.log(genre);

        return (
            <div class="card">

                    <div className="card-title">{genre.Name}</div>

                    <div className="card-label">DESCRIPTION</div>
                    <div className="card-desc">{genre.Description}</div>

                    <div className="line"></div>

                    <div className="other-movies-label">Other {genre.Name} movies</div>

                    {/* <div>{movie.map((m) => {
                        if (m.Genre.Name === genre.Name) {
                            return (
                            <div>
                                <MovieCard movie={m} />
                            </div>
                            )
                        }
                    })}      
                    </div> */}

                    <button className="close-btn" onClick={()=>onBackClick()} type="submit">X</button>

            </div>
        )
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
    }).isRequired,
}