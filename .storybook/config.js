import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { theme } from '../src/styles/Theme'
import { ThemeProvider } from 'styled-components'
import { addParameters } from '@storybook/client-api'

const req = require.context('../src/components', true, /.stories.tsx$/)
function loadStories() {
  req.keys().forEach(req)
}

/* addParameters({
  viewport: {
    viewports: newViewports, // newViewports would be an ViewportMap. (see below for examples)
    defaultViewport: 'responsive',
  },
})
 */
addDecorator((story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)

configure(loadStories, module)
