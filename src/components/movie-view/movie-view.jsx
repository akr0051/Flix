import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './movie-view.scss'
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
        
            <div class="card">
                <div variant="top" src={movie.ImagePath} />
                
                    <div>{movie.Title}</div>
                    <div>{movie.Description}</div>
                    <Link to={`/genres/${movie.Genre.Name}`}>
                        <button variant="link">Genre</button>
                    </Link>
                    <Link to={`/directors/${movie.Director.Name}`}>
                        <button variant="link">Director</button>
                    </Link>
                    <button variant="link" onClick={() => this.addFavorite(movie)} >Add to Favorites</button>
                    <Link to={'/'}>
                        <button variant="link">Back</button>
                    </Link>
                    
                </div>
            
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