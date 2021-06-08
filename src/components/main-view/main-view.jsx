import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list.jsx';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import './main-view.scss';

class MainView extends React.Component{
    
    constructor(){
        super();
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        console.log(accessToken)
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
        let { movies } = this.props;
        let{ user } = this.state;
        console.log(movies); 

        <Button onClick={() => { this.onLoggedOut() }}>Logout</Button>

        return (
            
            <Router>
                <Row className="main-view justify content-md-center">
                    <Route exact path="/" render={() => {
                        console.log("login", user, !user)
                        if (!user) return <Col>
                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        return <MoviesList movies={movies}/>
                        
                    }} />

                    <Route path="/register" render={() => {
                    if (user) return <Redirect to="/" />
                    return <Col>
                        <RegistrationView />
                    </Col>
                    }} />

                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            {<MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />}
                        </Col> 
                    }} />

                    <Route path="/directors/:name" render={({ match, history }) => {
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/genres/:name" render={({ match, history }) => {
                        if (movies.length === 0) return <div className="mainview" />;
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                </Row>
            </Router>   
            );
    }
        
}

let mapStateToProps = state => {
    return { movies: state.movies}
}
        
export default connect(mapStateToProps, { setMovies } ) (MainView);
