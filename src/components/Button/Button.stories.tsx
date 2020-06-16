import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Button } from './Button'
import Card from '../Card/Card'
import CardContainer from '../Card/CardContainer'

storiesOf('Components', module).add('Default Button', () => (
  <Card customWidth={50} customHeight={300}>
    <CardContainer>
      <Button>Default Button</Button>
    </CardContainer>
  </Card>
))
