import React from 'react'
import styled from 'styled-components'

interface FullPageLayoutProps {
  children: React.ReactNode
}

const FullPage = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`
const FullPageContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  justify-content: center;
  overflow-y: auto;
  transition: all 0.15s ease-in;
  z-index: 1000;
  background-color: ${(props) => props.theme.colors.background};
`

export const FullPageLayout: React.FC<FullPageLayoutProps> = (props) => {
  return (
    <FullPageContainer role="main">
      <FullPage>{props.children}</FullPage>
    </FullPageContainer>
  )
}
