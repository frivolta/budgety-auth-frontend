import React from 'react'
import { ThemeProvider } from 'styled-components'
import { createGlobalStyle } from 'styled-components'

interface Theme {
  children: React.ReactNode
}

export type MyTheme = {
  colors: {
    lightPrimary: string
    lightSecondary: string
    darkPrimary: string
    darkTertiary: string
    darkSecondary: string
    primaryColor: string
    altColor: string
    expenseColor: string
    incomeColor: string
    altBackground: string
    errorColor: string
    background: string
  }
  fonts: string[]
  fontSizes: {
    small: string
    smallLineHeight: string
    base: string
    medium: string
    baseLineHeight: string
    display: string
    displayLineHeight: string
  }
  misc: {
    headerHeight: string
    sidebarWidth: string
    aTags: string
    aTtagsHover: string
    borderRadius: string
  }
}

const GlobalStyles = createGlobalStyle`
 * {
    font-family: 'Poppins', sans-serif;
  }
`
export const theme = {
  colors: {
    lightPrimary: '#ffffff',
    lightSecondary: '#f2f2f7',
    darkPrimary: '#484848',
    darkTertiary: '#9596af',
    darkSecondary: '#e7e7e7',
    primaryColor: '#007aff',
    altColor: '#ff224f',
    expenseColor: '#ff224f',
    incomeColor: '#9beb34',
    background: '#f6f8f9',
    altBackground: 'rgba(255, 34, 79, 0.2)',
    errorColor: 'red',
  },
  fonts: ['Poppins', 'sans-serif'],
  fontSizes: {
    small: '14px',
    smallLineHeight: '18px',
    base: '16px',
    medium: '18px',
    baseLineHeight: '24px',
    display: '28px',
    displayLineHeight: '42px',
  },
  misc: {
    headerHeight: '72px',
    sidebarWidth: '255px',
    aTags: 'a, a:active, a:hover, a:visited',
    aTtagsHover: 'a:active, a:hover',
    borderRadius: '5px',
  },
}

const Theme: React.FC<Theme> = (props) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    {props.children}
  </ThemeProvider>
)

export default Theme
