import { css } from 'styled-components'

export const BREAKPOINTS = {
  mobile: 576,
  tablet: 768,
  desktop: 992,
  large: 1200
}

const mediaQueries = Object.keys(BREAKPOINTS).reduce((accumulator, label) => {
  const size = BREAKPOINTS[label]

  accumulator[label] = (...args) => css`
    @media (min-width ${size}px);
    ${css(...args)}
  `
  return accumulator
}, {})

export default mediaQueries
