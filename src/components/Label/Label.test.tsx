import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Label } from './Label'
import Theme from '../../styles/Theme'

describe('<Label/>', () => {
  const Component = () => {
    return <p>Component</p>
  }
  it('renders without errors with children', () => {
    render(
      <Theme>
        <Label>
          <Component />
        </Label>
      </Theme>
    )
  })
})
