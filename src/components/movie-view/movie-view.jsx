import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './movie-view.scss'
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";


export class MovieView extends React.Component{

    handleAdd = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        axios.post('https://flix0051.herokuapp.com/users/:Username/Movies/:MovieId',{},{
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => {
            alert("Movie has been added to favorites.")
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    render() {
        const { movie } = this.props;

        return (
            <Card>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/genres/${movie.Genre.Name}`}>
                        <Button variant="link">Genre</Button>
                    </Link>
                    <Link to={`/directors/${movie.Director.Name}`}>
                        <Button variant="link">Director</Button>
                    </Link>
                    <Link to={'movies/${movie._id'}>
                        <Button variant="link" onClick={() => this.handleAdd(movie)} >Add to Favorites</Button>
                    </Link>
                    <Link to={'/'}>
                        <Button variant="link">Back</Button>
                    </Link>
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
}