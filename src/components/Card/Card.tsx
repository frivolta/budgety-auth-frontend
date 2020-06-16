import React from 'react'
import styled from 'styled-components'
import { device } from '../../styles/config'

export interface CardProps {
  customWidth?: number
  customHeight?: number
  children?: React.ReactNode
}

const Card = styled.div<CardProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: ${(props) => props.theme.colors.lightPrimary};
  box-shadow: 2px 0px 15px rgba(0, 0, 0, 0.05);
  border-radius: ${(props) => props.theme.misc.borderRadius};
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow-x: hidden;
  font-family: ${(props) => props.theme.fonts[1]};
  @media ${device.laptop} {
    width: ${(props) =>
      props.customWidth ? `${props.customWidth}%` : '512px'};
    height: ${(props) =>
      props.customHeight ? `${props.customHeight}px` : 'auto'};
    max-width: 900px;
  }
`

export default Card
