import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { ModalSwitch, ModalRoute, ModalLink } from 'react-router-modal-gallery';
import { setMovies, setProfile } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import { NavView } from '../nav/nav';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';
import { Modal } from '../modal/modal'; 
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
            
            this.getUser(accessToken);
            this.getMovies(accessToken);
        }
    }    

    getUser(token) {
        const url = "https://flix0051.herokuapp.com/users/" + localStorage.getItem('user');
        axios.get(url, { headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
                this.props.setProfile(response.data);
                console.log('getUser', response.data)
        })
        .catch(function (error){
            alert("Error. Try again.");
            console.log(error);
        });
    }
    
    onLoggedIn(authData) {
        console.log(authData);
        this.props.setProfile(authData);
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.setProfile(null);
        window.open('/', '_self');
        
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
        let { movies, user } = this.props;
        console.log(movies); 

        return (
            
            <Router>
                <ModalSwitch
                
  renderModal={({ open, redirectToBack }) => (
    <Modal open={open} scroll="body" onExited={redirectToBack}>
      <ModalRoute
        defaultParentPath="/movies"
        path="/movies/movieId"
        component={MovieView}
      />
      <ModalRoute
        defaultParentPath="/directors"
        path="/directors/:name"
        component={DirectorView}
      />
      <ModalRoute
        defaultParentPath="/genres"
        path="/genres/:name"
        component={GenreView}
      />
    </Modal>
  )}
>
                <Row className="main-view justify content-md-center">
                    
                    <Route exact path="/" render={() => {
                        console.log("login", user, !user)
                        if (!user) return (
                        <Container>
                            <Row>
                                <Col className="p-0">
                                    <NavView user={user} />
                                </Col>
                            </Row>
                        <Col>
                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        </Container>)
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
                        return (
                        <Container>
                            <Row>
                                <Col className="p-0">
                                    <NavView user={user} />
                                </Col>
                            </Row>
                            
                            <Col md={8}>
                                {<MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />}
                            </Col> 
                      </Container>);
                    }} />

                    <Route path="/directors/:name" render={({ match, history }) => {
                        if (movies.length === 0) return <div className="main-view" />;
                        return (
                        <Container>
                            <Row>
                                <Col className="p-0">
                                    <NavView user={user} />
                                </Col>
                                

                            
                            </Row>
                            <Col md={8}>
                                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                            </Col>
                        </Container>
                        )
                    }} />

                    <Route path ="/users" render={({ match, history }) => {
                        if (!user) return <div className="main-view"/>
                        return (
                            <Container>
                                <Row>
                                    <Col className="p-0">
                                        <NavView user={user} />
                                    </Col>
                                </Row>
                                <ProfileView user={user} movies={movies} />
                            </Container>
                        )
                    }} />

                    <Route path="/genres/:name" render={({ match, history }) => {
                        if (movies.length === 0) return <div className="mainview" />;
                        return (
                            <Container>
                                <Row>
                                    <Col className="p-0">
                                        <NavView user={user} />
                                    </Col>
                                </Row>
                                <Col md={8}>
                                    <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                                </Col>
                            </Container>
                        )        
                    }} />
                </Row>
                </ModalSwitch>
            </Router>   
            );
    }
        
}

let mapStateToProps = state => {
    return {
        movies: state.movies,
        user: state.user
    }
}
        
export default connect(mapStateToProps, { setMovies, setProfile } ) (MainView);
