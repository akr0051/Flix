import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Modal } from '../modal/modal';
import { ModalLink } from 'react-router-modal-gallery';
import './movie-card.scss'

export class MovieCard extends React.Component {
    render(){
        const { movie } = this.props;

            <Link to={'/users'}>
                <button variant="link">My Profile</button>
            </Link>
       
        return (
            
        <div class="card">
            
            
                <div>{movie.Title}</div>
                <img variant="top" src={movie.ImagePath} />
                <div>{movie.Descriptiopn}</div>
                <Link to={`/movies/${movie._id}`}>
                    <button variant="link">Read More</button>
                </Link>
                <ModalLink to= {`/movies/${movie._id}`}>{movie.Title}</ModalLink>
            
        </div>
        )
     
    }   
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,   
    }),

};

 
            

