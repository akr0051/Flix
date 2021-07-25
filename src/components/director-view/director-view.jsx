import React from 'react';
import PropTypes from 'prop-types';
import './director-view.scss';

export class DirectorView extends React.Component {
    render () {
        const { director, onBackClick } = this.props;

        return(
            <div class="card">
                    <div>{director.Name}</div>
                    <div>Born: {director.Birth}</div>
                    <div>Died: {director.Death}</div>
                    <div>{director.Bio}</div>
                    <button className="std-button" onClick={()=>onBackClick()} variant="link">Back</button>
            </div>
            
        )


    }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
        Death: PropTypes.string,
    }),
}


