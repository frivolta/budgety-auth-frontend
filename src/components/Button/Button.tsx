import React from 'react'
import styled from 'styled-components'
import Spinner from 'react-svg-spinner'

interface ButtonProps {
  handleClick?: (
    e: React.BaseSyntheticEvent<object, any, any>
  ) => Promise<void> | void
  text?: string
  icon?: string
  disabled?: boolean
  isLoading?: boolean
}

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) => props.theme.colors.primaryColor};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: ${(props) => props.theme.misc.borderRadius};
  font-family: ${(props) => props.theme.fonts[0]};
  color: ${(props) => props.theme.colors.lightPrimary};
  font-weight: 500;
  font-size: ${(props) => props.theme.fontSizes.base};
  width: 100%;
  padding: ${(props) => props.theme.fontSizes.base};
  margin: ${(props) => props.theme.fontSizes.base} 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? '0.4' : '1')};
  transition: all ease-out 0.5s;
  border: none;
  :hover {
    opacity: ${(props) => (props.disabled ? '0.4' : '0.8')};
    transition: all ease-out 0.5s;
  }
`
export const ButtonLabel = styled.span`
  margin-top: 1px;
`

export const ButtonIcon = styled.img`
  margin-top: 1px;
`

export const CustomButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      onClick={props.handleClick}
      disabled={props.disabled}
      data-testid="CustomButton"
    >
      {props.icon && <ButtonIcon src={props.icon} alt="button icon" />}
      {!props.isLoading && (
        <ButtonLabel>{props.text && props.text}</ButtonLabel>
      )}
      {props.isLoading && (
        <ButtonLabel>
          <Spinner
            color="white"
            thickness={3}
            speed="slow"
            size="24px"
            data-testid="Spinner"
          />
        </ButtonLabel>
      )}
    </Button>
  )
}
