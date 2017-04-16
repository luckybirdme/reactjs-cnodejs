import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Root from './containers/Root'


import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}


render(Root)

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextApp = require('./containers/Root').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}