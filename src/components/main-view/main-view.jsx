import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { DirectorView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import './main-view.scss';


export class MainView extends React.Component{
    
    constructor(){
        super();
        this.state = {
            movies: [],
            user: null,
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user:localStorage.getItem ('user')
            });
            this.getMovies(accessToken);
        }
    }    

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    getMovies(token) {
        axios.get('https://flix0051.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            this.props.setMovies(response.data);
            })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const { movies, user, /* register  */} = this.state;

        /* if (!register) return <RegistrationView onRegister={register => this.onRegister(register)} />; */

        /* if (movies.length === 0) return <div className="main-view" />; */

        <button onClick={() => {this.onLoggedOut()}}>Logout</button>
      
        return (
            <Router>
                <Row className="main-view justify content-md-center">
                    <Route exact path="/" render={() => {
                        return movies.map(m => (
                            <Col md={3} key={m._id}>
                                <MovieCard movie={m} />
                            </Col>
                        ))
                    }} />
                    <Route path="/movies/:movieId" render={({ match }) => {
                        return <Col md={8}>
                            <MovieView movie={movies.find(m = m._id === match.params.movieId)} />
                        </Col>
                    }} />
                </Row>

                <Route exact path="/" render={() => {
                    if (!user) return <Col>
                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                    return movies.map(m => (
                        <Col md={3} key={m._id}>
                            <MovieCard movie={m} />
                        </Col>
                    ))    
                }} />

                <Route path="/register" render={() => {
                    return <Col>
                        <RegistrationView />
                    </Col>
                }} />
            </Router>
            )
    };
        
}
        

