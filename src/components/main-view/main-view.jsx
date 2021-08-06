import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Route, Redirect, Link } from 'react-router-dom';
import { setMovies, setProfile } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list.jsx';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import MovieView from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import './main-view.scss';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    console.log(accessToken);
    if (accessToken !== null) {
      this.getUser(accessToken);
      this.getMovies(accessToken);
    }
  }

  getUser(token) {
    const url = `https://flix0051.herokuapp.com/users/${localStorage.getItem('user')}`;
    axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        this.props.setProfile(response.data);
        console.log('getUser', response.data);
      })
      .catch((error) => {
        alert('Error. Try again.');
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.props.setProfile(authData.user);
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
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      movies, user, visibilityFilter, location,
    } = this.props;
    console.log(movies);

    return (

      <div className="main-view">

        <header className="index-header">

          <h1 className="title">Flix</h1>

          <VisibilityFilterInput visibilityFilter={visibilityFilter} />

          <button
            className="logout-btn"
            onClick={() => {
              this.onLoggedOut();
            }}
          >
            LOGOUT
          </button>

        </header>

        <div className="navbar">
          <Link
            to="/users"
            className={`nav-account ${location.pathname == '/users' ? '--active' : ''}`}
          >
            ACCOUNT
          </Link>
          <Link
            to="/"
            className={`nav-movies ${location.pathname == '/' ? '--active' : ''}`}
          >
            MOVIES
          </Link>
        </div>

        <Route
          exact
          path="/"
          render={() => {
            console.log('login', user, !user);
            if (!user) {
              return (

                <div>
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                </div>
              );
            }
            return <MoviesList movies={movies} />;
          }}
        />

        <Route
          path="/register"
          render={() => {
            if (user) return <Redirect to="/" />;
            return (
              <div>
                <RegistrationView />
              </div>
            );
          }}
        />

        <Route
          path="/movies/:movieId"
          render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return (

              <div>
                <MovieView movie={movies.find((m) => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </div>

            );
          }}
        />

        <Route
          path="/directors/:name"
          render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return (

              <DirectorView
                director={movies.find((m) => m.Director.Name === match.params.name).Director}
                movies={movies}
                onBackClick={() => history.goBack()}
              />

            );
          }}
        />

        <Route
          path="/users"
          render={({ match, history }) => {
            if (!user) return <div className="main-view" />;
            return (
              <div>

                <ProfileView user={user} movies={movies} />

              </div>
            );
          }}
        />

        <Route
          path="/genres/:name"
          render={({ match, history }) => {
            if (movies.length === 0) return <div className="mainview" />;
            return (

              <GenreView
                genre={movies.find((m) => m.Genre.Name === match.params.name).Genre}
                movies={movies}
                onBackClick={() => history.goBack()}
              />

            );
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies,
  user: state.user,
  visibilityFilter: state.visibilityFilter,
});

export default connect(mapStateToProps, { setMovies, setProfile })(MainView);
