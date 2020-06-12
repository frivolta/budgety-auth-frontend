import React from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/Theme'

interface CustomLabelProps {
  children?: React.ReactNode
  type?: string
}

export const Label = styled.span<{ color?: string }>`
  font-family: ${(props) => props.theme.fonts[0]};
  font-size: ${(props) => props.theme.fontSizes.base};
  font-weight: 300;
  color: ${(props) => props.color};

  a {
    color: ${(props) => props.theme.colors.altColor};
    font-weight: 700;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`

const defineLabelColor = (type: string | undefined): string => {
  switch (type) {
    case 'error':
      return 'red'
    default:
      return theme.colors.darkPrimary
  }
}

export const CustomLabel: React.FC<CustomLabelProps> = (props) => {
  return (
    <Label
      color={
        props.type ? defineLabelColor(props.type) : defineLabelColor(undefined)
      }
    >
      {props.children}
    </Label>
  )
}
