import React from 'react'
import styled from 'styled-components'
import { device } from '../../styles/config'
import Theme, { theme } from '../../styles/Theme'

export const HeaderContainer = styled.div`
  grid-area: header;
  display: flex;
  align-items: center;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.lightPrimary};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  z-index: 2;
  @media ${device.tabletMax} {
    position: fixed;
    width: 100%;
    height: 72px;
  }
`
export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: ${(props) => parseInt(props.theme.fontSizes.base) * 2};
`
export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${(props) => parseInt(props.theme.fontSizes.base) * 2};
`

const Header: React.FC = () => {
  return (
    <Theme>
      <Header>
        <HeaderLeft>Left</HeaderLeft>
        <HeaderRight>Right</HeaderRight>
      </Header>
    </Theme>
  )
}

export default Header
