import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Card from '../Card/Card'
import CardContainer from '../Card/CardContainer'
import { Input } from '../Input/Input'

storiesOf('Components', module).add('Input', () => (
  <Card customWidth={50}>
    <CardContainer>
      <Input
        placeholder="Default input"
        type="text"
        name="default-input"
        handleChange={action('change')}
        handleBlur={action('blur')}
        label="Default input"
      />
      <Input
        placeholder="Error input"
        type="text"
        name="error-input"
        handleChange={action('change')}
        handleBlur={action('blur')}
        label="Error Input"
        hasErrors={true}
        errorMessage="Error message"
      />
      <Input
        placeholder="Disabled input"
        type="text"
        name="disabled-input"
        handleChange={action('change')}
        handleBlur={action('blur')}
        label="Disabled input"
        disabled={true}
      />
      <Input
        placeholder="Password input"
        type="password"
        name="password-input"
        handleChange={action('change')}
        handleBlur={action('blur')}
        label="Password input"
      />
    </CardContainer>
  </Card>
))
