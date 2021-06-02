import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './director-view.scss';

export class DirectorView extends React.Component {
    render () {
        const { director, onBackClick } = this.props;

        return(
            <Card>
                <Card.Body>
                    <Card.Title>{director.Name}</Card.Title>
                    <Card.Text>Born: {director.Birth}</Card.Text>
                    <Card.Text>Died: {director.Death}</Card.Text>
                    <Card.Text>{director.Bio}</Card.Text>
                    <Button onClick={()=>onBackClick()} variant="link">Back</Button>
                </Card.Body>
            </Card>
        )


    }
}

DirectorView.propTypes = {
    Director: PropTypes.shape({
        Name: PropTypes.string,
        Bio: PropTypes.string,
        Birth: PropTypes.string,
        Death: PropTypes.string,
    }).isRequired,
}


