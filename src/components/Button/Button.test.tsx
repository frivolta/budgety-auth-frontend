import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Button, CustomButton } from './Button'
import Theme from '../../styles/Theme'

describe('<CustomButton/>', () => {
  const mockedClick = jest.fn()
  const text = 'Button text'

  it('renders without errors', () => {
    render(
      <Theme>
        <CustomButton handleClick={(e) => mockedClick(e)} text={text} />
      </Theme>
    )
  })

  it('shows spinner if it is loading', () => {
    const { getByTestId } = render(
      <Theme>
        <CustomButton
          handleClick={(e) => mockedClick(e)}
          text={text}
          isLoading
        />
      </Theme>
    )
    expect(getByTestId('Spinner')).toBeInTheDocument()
  })

  it('is disabled if has disabled prop and cannot click', () => {
    const { getByTestId } = render(
      <Theme>
        <CustomButton
          handleClick={(e) => mockedClick(e)}
          text={text}
          disabled
        />
      </Theme>
    )
    expect(getByTestId('CustomButton')).toBeDisabled()
    fireEvent.click(getByTestId('CustomButton'))
    expect(mockedClick).toHaveBeenCalledTimes(0)
  })

  it('calls an action on click', () => {
    const { getByTestId } = render(
      <Theme>
        <CustomButton handleClick={(e) => mockedClick(e)} text={text} />
      </Theme>
    )
    fireEvent.click(getByTestId('CustomButton'))
    expect(mockedClick).toHaveBeenCalledTimes(1)
  })
})
