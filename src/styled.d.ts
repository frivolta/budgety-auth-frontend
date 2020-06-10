/*eslint no-unused-vars: ["off"]*/
import 'styled-components'
import { MyTheme } from './styles/Theme'

declare module 'styled-components' {
  export interface DefaultTheme extends MyTheme {}
}
