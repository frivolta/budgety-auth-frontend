import React from 'react'
import styled from 'styled-components'
import { FieldError } from 'react-hook-form'

interface InputProps {
  small?: boolean
  placeholder: string
  type: string
  name: string
  value?: string
  register?: any
  hasErrors?: FieldError | boolean | undefined
  errorMessage?: string | undefined
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  blur?: ((event: React.FocusEvent<HTMLInputElement>) => void) | undefined
}

const InputContainer = styled.div`
  display: flex;
  margin: 16px 0;
  justify-content: center;
  flex-direction: column;
  font-family: ${(props) => props.theme.fonts[0]};
  font-size: ${(props) => props.theme.fontSizes.base};
  color: ${(props) => props.theme.colors.darkPrimary};
`

const InputField = styled.input<InputProps>`
  padding: 14px;
  border-radius: ${(props) => props.theme.misc.borderRadius};
  box-shadow: none;
  border: 1px solid
    ${(props) => (props.hasErrors ? 'red' : props.theme.colors.darkPrimary)};
  color: ${(props) => props.theme.colors.darkPrimary};
  outline: none;
  font-weight: 300;

  ::placeholder {
    color: ${(props) => props.theme.colors.darkPrimary};
  }

  :focus {
    border: 1px solid ${(props) => props.theme.colors.primaryColor};
    transition: all 0.5s;
  }
`

const InputError = styled.span`
  color: red;
  padding-top: 8px;
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: 500;
`

export const Input: React.FC<InputProps> = (props) => {
  return (
    <InputContainer>
      <InputField
        name={props.name}
        ref={props.register}
        type={props.type}
        value={props.value}
        onChange={props.handleChange}
        onBlur={props.blur}
        placeholder={props.placeholder}
        disabled={props.disabled ? props.disabled : false}
        data-testid="Input"
        hasErrors={props.hasErrors}
      />
      {props.hasErrors && (
        <InputError data-testid="InputError">{props.errorMessage}</InputError>
      )}
    </InputContainer>
  )
}
