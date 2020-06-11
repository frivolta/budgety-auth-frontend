import React from 'react'
import styled from 'styled-components'

interface CustomLabelProps {
  children: React.ReactNode
}

export const Label = styled.span`
  font-family: ${(props) => props.theme.fonts[0]};
  font-size: ${(props) => props.theme.fontSizes.base};
  font-weight: 300;
  color: ${(props) => props.theme.colors.darkPrimary};

  a {
    color: ${(props) => props.theme.colors.altColor};
    font-weight: 500;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`

export const CustomLabel: React.FC<CustomLabelProps> = (props) => {
  return <Label>{props.children}</Label>
}
