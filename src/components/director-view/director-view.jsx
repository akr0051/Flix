import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './director-view.scss';

export class DirectorView extends React.Component {
    render () {
        const { director, onMovieClick } = this.props;

        return(
            <Card>
                <Card.Body>
                    <Card.Title>{director.Name}</Card.Title>
                    <Card.Text>{director.Bio}</Card.Text>
                    <Card.Text>{director.Birth}</Card.Text>
                    <Card.Text>{director.Death}</Card.Text>
                    <Button onClick={() => onMovieClick(movie)} variant="link">Back</Button>
                </Card.Body>
            </Card>
        )


    }
}

DirectorView.PropTypes = {
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
}


