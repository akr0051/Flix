import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import moviesApp from './reducers/reducers';
import MainView from './components/main-view/main-view';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';

import './index.scss';
import { devToolsEnhancer } from 'redux-devtools-extension';

const store = createStore(moviesApp, devToolsEnhancer());
const HistoryMainView = withRouter((props) => <MainView {...props} />);

class FlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <HistoryMainView />
        </Router>
      </Provider>
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(FlixApplication), container);
