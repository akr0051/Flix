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

    constructor(props) {
        super(props)
        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavoriteMovies: [],
        }
    }
    
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        console.log(accessToken)
        
    }
    
    handleUpdate(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        const url = 'https://flix0051.herokuapp.com/users/';

        axios.put(url + user, {
            headers: { Authorization: `Bearer ${token}` },
            
            data: {
                Username: this.state.Username,
                Password: this.state.Password,
                Email: this.state.Email,
                Birthday: this.state.Birthday,
            },
        })
        .then(response => {
            const data = response.data;
            localStorage.setItem('user', data.Username);
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
                setProfile({
                user: null,
                token: null
                });
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
        .then( () => {
            alert('Movie Removed From Favorites');
            this.componentDidMount;
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    
    render() {
        const { movies, user } = this.props;
        console.log("render profile view", this.props);
        const favoriteMoviesList = movies.filter((movie) => {
            return user.FavoriteMovies.includes(movie._id)
        });
        const token = localStorage.getItem('token');

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
                                <Button variant="link" onClick={() => this.removeFavorite(movie)} >Remove from Favorites</Button>
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
                        <Form>
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
                            <Button className="profile-button" onClick={(e) => this.handleUpdate(e)} type="submit">Update Profile</Button>
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
        Username: PropTypes.string.isRequired,
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
