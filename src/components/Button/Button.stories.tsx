import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { CustomButton } from '../Button/Button'
import Card from '../Card/Card'
import CardContainer from '../Card/CardContainer'

storiesOf('Components', module).add('Custom Button', () => (
  <Card customWidth={50}>
    <CardContainer>
      <CustomButton handleClick={action('click')} text="Default Button" />
    </CardContainer>
    <CardContainer>
      <CustomButton
        handleClick={action('click')}
        text="Loading Button"
        isLoading
      />
    </CardContainer>
    <CardContainer>
      <CustomButton handleClick={action('click')} text="Disabled" disabled />
    </CardContainer>
  </Card>
))
