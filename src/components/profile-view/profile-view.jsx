import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Card, Container, Form } from 'react-bootstrap';
import './profile-view.scss';
import { connect } from 'react-redux';
import { setProfile } from '../../actions/actions'

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
    
    // componentDidMount() {
    //     let accessToken = localStorage.getItem('token');
    //     this.getUser(accessToken);
    // }
    
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
            const data = response.data;
            localStorage.setItem('user', data.Username);
            alert("Changes Updated")
        })
        .catch(function (error) {
            console.log(error);
        });    
    }

    handleDeregister(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        axios.delete('https://flix0051.herokuapp.com/users/:Username',
            {headers: {Authorization: `Bearer ${token}`}}
        )
        .then(response => {
            alert('Profile Deleted')
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handleRemoveFavorite(movie) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        axios.delete('https://flix0051.herokuapp.com/users/:Username/movies/:MovieId',
            {headers: {Authorization: `Bear ${token}`}}
        )
        .then(response => {
            this.componentDidMount();
            alert('Movie Removed From Favorites')
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    
    render() {
        const { movies, user } = this.props;
        const userFavoriteMovies = user.favoriteMovies;
        const favoriteMoviesList = movies.filter((movie) => {
            return this.state.userFavoriteMovies.includes(movie._id)
        });
        const token = localStorage.getItem('token');

        return (
            <Container>
                <Card.Title>My Favorite Movies</Card.Title>
                    {favoriteMoviesList.map((movie) => {
                        return(
                            <Card>
                                <Card.Body>
                                    <Card.Text>Username: {user.Username} </Card.Text>
                                    <Card.Text>Email: {user.Email} </Card.Text>
                                    <Card.Text>Birthday: {user.Birthday} </Card.Text>
                                    <Button onClick={(e) => this.handleDeregister(e)} variant="submit" className='delete-button'>Delete Account</Button>
                                </Card.Body>
                            </Card>
                        )})}
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
            <Container>
                <Card>
                    <Card.Img variant="top" src={movie.ImagePath} />
                    <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Link to={`/movies/${movie._id}`}>
                            <Button variant="link">Open</Button>
                        </Link>    
                    </Card.Body>
                </Card>
            </Container>    
            </Container>
            </Container>
        )
    }
}

// ProfileView.propTypes = {
//     user: PropTypes.shape( {
//         Username: PropTypes.string,
//         Password: PropTypes.string,
//         Email: PropTypes.string,
//         Birthday: PropTypes.string,
//         FavoriteMovies: PropTypes.arrayOf(
//             PropTypes.shape({
//                 _id: PropTypes.string
//             })
//         )
//     })
// }

let mapStateToProps = state => {
    return{
        movies: state.movies,
        user: state.user,
    }
}
export default connect(mapStateToProps, { setProfile })(ProfileView)
