import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Modal } from '../modal/modal';
import { ModalLink } from 'react-router-modal-gallery';
import './movie-card.scss'

export class MovieCard extends React.Component {
    render(){
        const { movie } = this.props;

            <Link to={'/users'}>
                <Button variant="link">My Profile</Button>
            </Link>
       
        return (
            
        <Card>
            
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Text>{movie.Descriptiopn}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">Read More</Button>
                </Link>
                <ModalLink to= {`/movies/${movie._id}`}>{movie.Title}</ModalLink>
            </Card.Body>    
        </Card>
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

 
            

