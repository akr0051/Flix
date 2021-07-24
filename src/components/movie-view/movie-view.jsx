import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './movie-view.scss'
import { Card } from 'react-bootstrap';
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
                    <Button variant="link" onClick={() => this.addFavorite(movie)} >Add to Favorites</Button>
                    <Link to={'/'}>
                        <Button variant="link">Back</Button>
                    </Link>
                </Card.Body>      
            </Card>
            
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

export default connect( { setProfile })(MovieView)