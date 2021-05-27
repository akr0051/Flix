import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import './genre-view';

export class GenreView extends React.Component {
    render () {
        const { genre, onMovieClick } = this.props;

        return (
            <Card>
                <Card.Body>
                    <Card.Title>{genre.Name}</Card.Title>
                    <Button onClick={() => onMovieClick(movie)} variant="link">Back</Button>
                </Card.Body>
            </Card>
        )
    }
}

GenreView.PropTypes = {
    Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
}