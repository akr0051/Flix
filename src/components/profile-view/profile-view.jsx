import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { FiTrash } from 'react-icons/fi'
import './profile-view.scss';
import { connect } from 'react-redux';
import { setProfile } from '../../actions/actions';
import { Link } from 'react-router-dom';

export class ProfileView extends React.Component{
    
    handleUpdate(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        const url = 'https://flix0051.herokuapp.com/users/';

        console.log('Update', e.target);
        
        const form = e.target;
        const username = e.target[0].value;
        const password = e.target[1].value;
        const email = e.target[2].value;
        const birthday = e.target[3].value;

        console.log("Update", {username, password})

        axios.put(
            url + user, 
            {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
            const data = response.data;
            localStorage.setItem('user', data.Username);
            this.props.setProfile(data);
            alert("Changes Updated")
        })
        .catch(function (error) {
            console.log(error);
        });    
    }

    deregister(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        const url = 'https://flix0051.herokuapp.com/users/';

        axios.delete(url + user, {
            headers: { Authorization: `Bearer ${token}` },
            })
            .then( () => {
                localStorage.clear();
                this.props.setProfile(null);
                alert('Your account has been deleted!');
                window.open('/', '_self');
            })
            .catch(function (error) {
                console.log(error);
        });
    }

    removeFavorite(movie) {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        const url = 'https://flix0051.herokuapp.com/users/';

        axios.delete(url + user + '/Movies/' + movie._id, {
            headers: {Authorization: `Bearer ${token}` }}
        )
        .then( (response) => {
            alert('Movie Removed From Favorites');
            console.log('Remove', this.props.setProfile, response.data);
            this.props.setProfile(response.data);
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    
    render() {
        const { movies, user } = this.props;
        console.log("render profile view", this.props);

        if (movies.length === 0 || !user) return <div>Loading...</div>

        const favoriteMoviesList = movies.filter((movie) => {
            return user.FavoriteMovies.includes(movie._id)
        });

        return (
            <div className="profile-bg">

                <div className="profile-title">Personal Info</div>      

                    <div className="fav-box">

                        <div className="fav-title">My Favorite Movies</div>

                            {favoriteMoviesList.map((movie) => {
                                return(
                                    <div className="movie-fav-box">

                                        <div className="fav-info">
                                            
                                            <div className="fav-movie-link">
                                                <Link to={`/movies/${movie._id}`}>
                                                    <div className="movie-title-link">{movie.Title}</div>
                                                </Link>
                                            </div>

                                            <div className="movie-desc">{movie.Description}</div>   

                                        </div>

                                        <div className="delete-icon" onClick={() => this.removeFavorite(movie)} ><FiTrash color="white"/></div>

                                    </div>
                            )})}
                    </div>

                        <div onSubmit={e => this.handleUpdate(e)}>

                            <div className="profile-box">

                                <div className="profile-label">Username</div>
                                <div className="profile-control-box">
                                    <input className="profile-input" type="text" placeholder="John" ></input>
                                </div>

                                <div className="profile-label">Email</div>
                                <div className="profile-control-box">
                                    <input className="profile-input" type="email" placeholder="John@google.com"></input>
                                </div>

                                <div className="password-title">Password</div>

                                <div className="profile-label">Old Password</div>
                                <div className="password-control-box">
                                    <input className="password-input" type="password" placeholder="********"></input>
                                </div>

                                <div className="passwords">

                                    <div className="new-password">
                                        <div className="profile-label">New Password</div>
                                        <div className="password-control-box">
                                            <input className="password-input" type="password" placeholder="********"></input>
                                        </div>
                                    </div>

                                    <div className="repeat-password">
                                        <div className="profile-label">Repeat Password</div>
                                        <div className="password-control-box">
                                            <input className="password-input" type="password" placeholder="********"></input>
                                        </div>
                                    </div>

                                </div>
                            
                                {/* <div className="profile-label">Birthday</div>
                                <input className="profile-input" type="text" placeholder="New Birthday"></input> */}
                           
                           <div><button className="profile-btn" type="submit">Save Settings</button></div>

                        </div>

                        <button onClick={(e) => this.deregister(e)} variant="submit" className='delete-btn'><FiTrash color="white"/>Delete Account</button>

                    </div>
                    

            
            </div>

        )
            
    }
    
}

ProfileView.propTypes = {
    user: PropTypes.shape( {
        Username: PropTypes.string,
        Password: PropTypes.string,
        Email: PropTypes.string,
        Birthday: PropTypes.string,
    })
}

let mapStateToProps = state => {
    return{
        movies: state.movies,
        user: state.user,
    }
}
export default connect(mapStateToProps, { setProfile })(ProfileView)
