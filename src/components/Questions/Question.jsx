import styled from 'styled-components'

import mediaQueries from '../../utils/breakpoints'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  ${mediaQueries.desktop`padding: 40px;`}
`

export const QuestionCard = styled.div`
  background: white;
  border: 1px solid #ddd;
  borde-radius: 5px;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  margin: 20px 0;
`
