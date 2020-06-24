import React from 'react'
import styled from 'styled-components'
import { device } from '../../styles/config'
import Theme, { theme } from '../../styles/Theme'

interface DashboardSidenavContainerProps {
  isActive: boolean
}

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: ${(props) => props.theme.misc.headerHeight} 1fr 50px;
  grid-template-areas: 'header header' 'sidenav main' 'sidenav footer';
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  @media ${device.tabletMax} {
    grid-template-columns: 1fr;
    min-height: 100vh;
    height: auto;
    grid-template-areas: 'header' 'main' 'footer';
  }
`
export const DashboardMainContainer = styled.div`
  grid-area: main;
  background-color: ${(props) => props.theme.colors.lightSecondary};
`

export const DashboardHeaderContainer = styled.div`
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
export const DashboardHeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: ${(props) => parseInt(props.theme.fontSizes.base) * 2};
`
export const DashboardHeaderRight = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${(props) => parseInt(props.theme.fontSizes.base) * 2};
`

export const DashboardFooterContainer = styled.div`
  grid-area: footer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  background-color: $lightSecondary;
  @media ${device.tabletMax} {
    height: 72px;
  }
`

export const DashboardSidenavContainer = styled.div<
  DashboardSidenavContainerProps
>`
  grid-area: sidenav;
  padding-top: ${(props) => props.theme.misc.headerHeight};
  transition: all 0.4s ease-in-out;
  background: ${(props) => props.theme.colors.lightPrimary};
  display: flex;
  box-shadow: 10px 0px 10px rgba(0, 0, 0, 0.05);

  @media ${device.tabletMax} {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    max-width: 100%;
    bottom: 0;
    transform: ${(props) =>
      props.isActive ? `transform: translate(0, 0);` : `translate(-100%, 0)`};
  }
`

export const DashboardSidenavTitle = styled.div`
  margin-top: 3rem;
  margin-bottom: 16px;
  margin-left: 32px;
  margin-right: 32px;
`

export const DashboardSidenavHr = styled.hr`
  border-top: 1px solid ${(props) => props.theme.colors.darkSecondary};
  margin-left: 32px;
  margin-right: 32px;
`

const Dashboard: React.FC = () => {
  return (
    <Theme>
      <Grid>
        <DashboardHeaderContainer />
        <DashboardSidenavContainer isActive />
        <DashboardMainContainer />
        Dashboard
        <DashboardFooterContainer />
      </Grid>
    </Theme>
  )
}

export default Dashboard
