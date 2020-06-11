import styled from 'styled-components'
import { theme } from './Theme'

interface TypographyProps {
  color?: string
  size?: string
}

// Define typography styles
export const H1 = styled.h1<TypographyProps>`
  font-size: 32px;
  line-height: 42px;
  font-weight: 700;
  color: ${(props) => (props.color ? props.color : theme.colors.primaryColor)};
`

export const H2 = styled.h2<TypographyProps>`
  font-size: 36px;
  font-weight: bold;
  color: ${(props) => (props.color ? props.color : theme.colors.primaryColor)};
`

export const H3 = styled.h3<TypographyProps>`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => (props.color ? props.color : theme.colors.primaryColor)};
`

export const H4 = styled.h4<TypographyProps>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.color ? props.color : theme.colors.primaryColor)};
`

export const H5 = styled.h5<TypographyProps>`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => (props.color ? props.color : theme.colors.primaryColor)};
`

export const H6 = styled.h6<TypographyProps>`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => (props.color ? props.color : theme.colors.primaryColor)};
`

export const Text = styled.p`
  font-size: 16px;
`

export const Span = styled.span<TypographyProps>`
  color: ${(props) => (props.color ? props.color : theme.colors.primaryColor)};
  size: ${(props) => (props.size ? props.size : theme.fontSizes.base)};
`

export const Small = styled.small`
  font-size: 80%;
`
