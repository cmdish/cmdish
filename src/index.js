import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Root from './containers/Root'

import AppState from './AppState';

const appState = new AppState();

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Root appState={appState} />
        </AppContainer>,
        document.getElementById('root')
    );
};

render();

if (module.hot) {
  module.hot.accept('./containers/Root', render)
}
