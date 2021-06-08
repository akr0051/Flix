import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Card, Container, Form } from 'react-bootstrap';
import './profile-view.scss';

export class ProfileView extends React.Component{

    constructor(props) {
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
        this.getUser(accessToken);
    }

    getUser(token) {
        const url = "https://flix0051.herokuapp.com/users/" + localStorage.getItem('user');
        axios.get(url, { headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthday: response.data.Birthday,
                FavoriteMovies: response.data.FavoriteMovies
            });
        })
        .catch(function (error){
            console.log(error);
        });
    }
    
    handleUpdate(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        axios.put('https://flix0051.herokuapp.com/users/:Username',{
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.Email,
            Birthday: this.state.Birthday},
            {headers: {Authorization: `Bearer ${token}`}}
        )
        .then(response => {
            const data =response.data;
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

        axios.delete('https://flix0051.herokuapp.com/users/:Username',
            {headers: {Authorization: `Bearer ${token}`}}
        )
        .then(response => {
            alert('Profile Deleted')
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    removeFavorite(movie) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        axios.delete('https://flix0051.herokuapp.com/users/:Username/movies/:MovieId',
            {headers: {Authorization: `Bear ${token}`}}
        )
        .then(response => {
            alert('Movie Removed From Favorites')
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    
    
    render() {
        const { movies, user } = this.props;
        const userFavoriteMovies = this.state.FavoriteMovies;
        const FavoriteMoviesList = movies.filter((movie) => userFavoriteMovies.includes(movie._id));
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Text>Username: {this.state.Username} </Card.Text>
                        <Card.Text>Email: {this.state.Email} </Card.Text>
                        <Card.Text>Birthday: {this.state.Birthday} </Card.Text>
                        <Button onClick={() => this.deregister()} variant="" className='delete-button'>Delete Account</Button>
                    </Card.Body>
                </Card>
            <Container>
                <Card>
                    <Card.Body>
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
                            <Button className="profile-button" type="submit">Update Profile</Button>
                        </Form>    
                    </Card.Body>
                </Card>
            </Container>
            </Container>
        )
    }
}

ProfileView.PropTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string,
        Password: PropTypes.string,
        Email: PropTypes.string,
        Birthday: PropTypes.string,
        FavoriteMovies: PropTypes.string,
    })
}
