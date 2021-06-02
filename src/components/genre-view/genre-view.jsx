import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import './genre-view.scss';

export class GenreView extends React.Component {
    render () {
        const { genre, onBackClick } = this.props;
        console.log(genre);

        return (
            <Card>
                <Card.Body>
                    <Card.Title>{genre.Name}</Card.Title>
                    <Card.Text>{genre.Description}</Card.Text>
                    <Button onClick={()=>onBackClick()} variant="link">Back</Button>
                </Card.Body>
            </Card>
        )
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
    }).isRequired,
}