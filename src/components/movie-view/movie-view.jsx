import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FaRegHeart } from 'react-icons/fa';
import './movie-view.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setProfile } from '../../actions/actions';


export class MovieView extends React.Component{

    addFavorite(movie) {
        const token = localStorage.getItem('token');
        const url = 'https://flix0051.herokuapp.com/users/' + localStorage.getItem('user') + '/Movies/' + movie._id;

        axios.post(url, "", {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => {
            alert("Movie has been added to favorites.");
            this.props.setProfile(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }    
    
    
    render() {
        const { movie, onBackClick } = this.props;

        return (
           
            <div className="card">

                <img className="movie-img" style={{backgroundImage: `url(${movie.ImagePath})` }} />

                <div className="genre-title">{movie.Genre.Name}</div>

                <div className="fav">
                    <div className="card-title" id="movie-title">{movie.Title}</div>
                    <div className="fav-icon" onClick={() => this.addFavorite(movie)} ><FaRegHeart color="white"/></div>
                </div>

                <div className="card-label">DESCRIPTION</div>

                <div className="card-desc">{movie.Description}</div>

                <div className="dir-line">

                    <div className="info-links">

                        <div className="info-mv">DIRECTOR</div>

                        <Link to={`/directors/${movie.Director.Name}`}>
                            <div className="info-link">{movie.Director.Name}</div>
                        </Link>

                    </div>

                    <div className="info-links">

                        <div className="info-mv">GENRE</div>

                        <Link to={`/genres/${movie.Genre.Name}`}>
                            <div className="info-link">{movie.Genre.Name}</div>
                        </Link>
                        
                    </div>

                </div>    
                        
                <button className="close-btn" type="submit" onClick={()=>onBackClick()} >X</button>
                        
            </div>

        )
       
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
    }),
}

export default connect( null, { setProfile })(MovieView)