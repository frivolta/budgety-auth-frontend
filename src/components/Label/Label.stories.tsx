import React from 'react'
import { storiesOf } from '@storybook/react'
import Card from '../Card/Card'
import CardContainer from '../Card/CardContainer'
import { CustomLabel } from '../Label/Label'

storiesOf('Components', module).add('Label', () => (
  <Card customWidth={50}>
    <CardContainer>
      <CustomLabel>Default Label</CustomLabel>
      <br />
      <CustomLabel type="error">Error Label</CustomLabel>
    </CardContainer>
  </Card>
))
