import '@testing-library/jest-dom'
import React from 'react'
import App from './App'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

describe('App', () => {
  it('renders without error', () => {
    render(<App />)
  })
})
