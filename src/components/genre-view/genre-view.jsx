import React from 'react';
import PropTypes from 'prop-types';
import './genre-view.scss';

export class GenreView extends React.Component {
    render () {
        const { genre, onBackClick } = this.props;
        console.log(genre);

        return (
            <div class="card">
                    <div>{genre.Name}</div>
                    <div>{genre.Description}</div>
                    <button onClick={()=>onBackClick()} variant="link">Back</button>
            </div>
        )
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
    }).isRequired,
}