import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'
import './movie-view.scss'
import { Card } from 'react-bootstrap';

export class MovieView extends React.Component{

    render() {
        const { movie, onGenreClick, onDirectorClick, onBackClick } = this.props;

        return (
            <Card>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/genres/$/${movie.Genre.Name}`}>
                        <Button variant="link">Genre</Button>
                    </Link>
                    <Link to={`/directors/${movie.Director.Name}`}>
                        <Button variant="link">Director</Button>
                    </Link>
                    <Button onClick={() => onBackClick(null)} variant="link">Back</Button>
                </Card.Body>      
            </Card>
        )
        
        /* return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="label">Title:</span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description:</span>
                    <span className="value">{movie.Description}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        ); */
    }
}

MovieView.propTypes = {
    movie:PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
    onDirectorClick: PropTypes.func.isRequired,
    onGenreClick: PropTypes.func.isRequired
}