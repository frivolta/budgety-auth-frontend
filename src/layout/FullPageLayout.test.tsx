import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { FullPageLayout } from './FullPageLayout'
import Theme from '../styles/Theme'

describe('<FullPageLayout/>', () => {
  const Component = () => {
    return <p>Component</p>
  }
  it('renders without errors with children', () => {
    render(
      <Theme>
        <FullPageLayout>
          <Component />
        </FullPageLayout>
      </Theme>
    )
  })

  it('renders with page role', () => {
    const { getByRole } = render(
      <Theme>
        <FullPageLayout>
          <Component />
        </FullPageLayout>
      </Theme>
    )
    expect(getByRole('main')).toBeInTheDocument()
  })
})
