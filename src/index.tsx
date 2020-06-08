import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './style.css'
import '@babel/polyfill'
import DefaultErrorBoundary from './DefaultErrorBoundary'

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const axe = require('react-axe')
  axe(React, ReactDOM, 1000)
}

ReactDOM.render(
  <DefaultErrorBoundary>
    <App />
  </DefaultErrorBoundary>,
  document.getElementById('app')
)
