import React from 'react'
import { storiesOf } from '@storybook/react'
import Card from './Card'

storiesOf('Grid', module).add('Default Card', () => (
  <>
    <Card customWidth={50} customHeight={300}>
      <p>Default Card</p>
    </Card>
    <Card customWidth={50} customHeight={300}>
      <p>customWidth = 50 customHeight = 300</p>
    </Card>
  </>
))
