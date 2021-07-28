import React from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import './director-view.scss';

export class DirectorView extends React.Component {
    
    render () {
        const { movie, director, onBackClick } = this.props;

        return(

            <div className="card">

                    <div className="card-title">{director.Name}</div>

                    <div className="card-label">BIOGRAPHY</div>
                    <div className="card-desc">{director.Bio}</div>

                    <div className="line"></div>

                    <div className="stats-label">
                        <div className="born-label">BORN</div>
                        <div className="died-label">DIED</div>
                    </div>

                    <div className="stats-info">
                        <div className="born">{director.Birth}</div>
                        <div className="died">{director.Death}</div>
                    </div>

                    <div className="line"></div>

                    <div className="other-movies-label">Other {director.Name} movies</div>
                    
                    {/* <div>{movie.map((m) => {
                        if (m.Director.Name === director.Name) {
                            return (
                            <div>
                                <MovieCard movie={m} />
                            </div>
                            )
                        }
                    })}      
                    </div> */}

                    <button className="close-btn" type="submit" onClick={()=>onBackClick()} >X</button>
            </div>
            
        )


    }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string,
    }),
}
