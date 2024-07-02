import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import React from 'react'
import AnswerProgress from './AnswerProgress'

describe('ProgressBar', () => {
  it('renders the progress bar with correct styles and attributes', () => {
    const scorePercentage = 50
    const maxPossibleScore = 100
    const minPossibleScore = 20

    const {getAllByRole} = render(
      <AnswerProgress
        scorePercentage={scorePercentage}
        maxPossibleScore={maxPossibleScore}
        minPossibleScore={minPossibleScore}
      />
    )

    const progressBars = getAllByRole('progressbar')

    expect(progressBars.length).toBe(3)

    expect(progressBars[0].style.width).toBe(`${minPossibleScore}%`)
    expect(progressBars[0]).toHaveAttribute('aria-valuemin', '0')
    expect(progressBars[0]).toHaveAttribute('aria-valuemax', '100')
    expect(progressBars[0]).toHaveAttribute(
      'aria-valuenow',
      minPossibleScore.toString()
    )

    expect(progressBars[1].style.width).toBe(`${scorePercentage}%`)
    expect(progressBars[1]).toHaveAttribute('aria-valuemin', '0')
    expect(progressBars[1]).toHaveAttribute('aria-valuemax', '100')
    expect(progressBars[1]).toHaveAttribute(
      'aria-valuenow',
      scorePercentage.toString()
    )

    const remainingPercentage = maxPossibleScore - scorePercentage
    expect(progressBars[2].style.width).toBe(`${remainingPercentage}%`)

    expect(progressBars[2]).toHaveAttribute('aria-valuemin', '0')
    expect(progressBars[2]).toHaveAttribute('aria-valuemax', '100')
    expect(progressBars[2]).toHaveAttribute(
      'aria-valuenow',
      remainingPercentage.toString()
    )
  })

  it('handles minPossibleScore greater than scorePercentage gracefully', () => {
    const scorePercentage = 30
    const maxPossibleScore = 100
    const minPossibleScore = 40

    const {getAllByRole} = render(
      <AnswerProgress
        scorePercentage={scorePercentage}
        maxPossibleScore={maxPossibleScore}
        minPossibleScore={minPossibleScore}
      />
    )

    const progressBars = getAllByRole('progressbar')

    expect(progressBars.length).toBe(3)

    expect(progressBars[0].style.width).toBe(`${minPossibleScore}%`)
    expect(progressBars[0]).toHaveAttribute('aria-valuemin', '0')
    expect(progressBars[0]).toHaveAttribute('aria-valuemax', '100')
    expect(progressBars[0]).toHaveAttribute(
      'aria-valuenow',
      minPossibleScore.toString()
    )

    expect(progressBars[1].style.width).toBe(`${scorePercentage}%`)
    expect(progressBars[1]).toHaveAttribute('aria-valuemin', '0')
    expect(progressBars[1]).toHaveAttribute('aria-valuemax', '100')
    expect(progressBars[1]).toHaveAttribute(
      'aria-valuenow',
      scorePercentage.toString()
    )

    const remainingPercentage = maxPossibleScore - scorePercentage
    expect(progressBars[2].style.width).toBe(`${remainingPercentage}%`)

    expect(progressBars[2]).toHaveAttribute('aria-valuemin', '0')
    expect(progressBars[2]).toHaveAttribute('aria-valuemax', '100')
    expect(progressBars[2]).toHaveAttribute(
      'aria-valuenow',
      remainingPercentage.toString()
    )
  })

  it('handles maxPossibleScore less than scorePercentage gracefully', () => {
    const scorePercentage = 110
    const maxPossibleScore = 100
    const minPossibleScore = 90

    const {getAllByRole} = render(
      <AnswerProgress
        scorePercentage={scorePercentage}
        maxPossibleScore={maxPossibleScore}
        minPossibleScore={minPossibleScore}
      />
    )

    const progressBars = getAllByRole('progressbar')

    expect(progressBars.length).toBe(3)

    expect(progressBars[0].style.width).toBe(`${minPossibleScore}%`)

    expect(progressBars[0]).toHaveAttribute('aria-valuemin', '0')
    expect(progressBars[0]).toHaveAttribute('aria-valuemax', '100')
    expect(progressBars[0]).toHaveAttribute(
      'aria-valuenow',
      minPossibleScore.toString()
    )

    expect(progressBars[1].style.width).toBe(`${scorePercentage}%`)

    expect(progressBars[1]).toHaveAttribute('aria-valuemin', '0')
    expect(progressBars[1]).toHaveAttribute('aria-valuemax', '100')
    expect(progressBars[1]).toHaveAttribute(
      'aria-valuenow',
      scorePercentage.toString()
    )

    const remainingPercentage = maxPossibleScore - scorePercentage
    expect(progressBars[2]).toHaveAttribute('aria-valuemin', '0')
    expect(progressBars[2]).toHaveAttribute('aria-valuemax', '100')
    expect(progressBars[2]).toHaveAttribute(
      'aria-valuenow',
      remainingPercentage.toString()
    )
  })
})
