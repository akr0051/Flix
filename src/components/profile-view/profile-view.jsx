import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Card, Container, Form } from 'react-bootstrap';
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
            <Container>
                <Card.Title>My Favorite Movies</Card.Title>
                    {favoriteMoviesList.map((movie) => {
                        return(
                            <Card>
                                <Card.Img variant="top" src={movie.ImagePath} />
                                <Card.Body>
                                    <Card.Title>{movie.Title}</Card.Title>
                                    <Link to={`/movies/${movie._id}`}>
                                        <Button variant="link">Open</Button>
                                    </Link>    
                                </Card.Body>
                                <Button variant="link" onClick={() => this.removeFavorite(movie)} >Remove From Favorites</Button>
                            </Card>
                            
                        )})}
                          
            <Container>
                <Card>
                    <Card.Title>User</Card.Title>
                    <Card.Body>
                        <Card.Text>Username: {user.Username} </Card.Text>
                        <Card.Text>Email: {user.Email} </Card.Text>
                        <Card.Text>Birthday: {user.Birthday} </Card.Text>
                    </Card.Body>
                        <Form onSubmit={e => this.handleUpdate(e)}>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="New Username" ></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="text" placeholder="New Password"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="New Email"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control type="text" placeholder="New Birthday"></Form.Control>
                            </Form.Group>
                            <Button className="profile-button" type="submit">Update Profile</Button>
                            <Button onClick={(e) => this.deregister(e)} variant="submit" className='delete-button'>Delete Account</Button>
                        </Form>    
                    
                </Card>
            </Container>
            </Container>
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
