import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import React from 'react'
import QuestionProgress from './QuestionProgress'

describe('QuestionProgress', () => {
  it('renders the progress bar with correct styles and attributes for valid props', () => {
    const currentQuestion = 3
    const totalQuestions = 10
    const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100

    const {getByRole} = render(
      <QuestionProgress
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
      />
    )

    const progressBar = getByRole('progressbar')

    expect(progressBar.style.width).toBe(`${progressPercentage}%`)
    expect(progressBar).toHaveAttribute(
      'aria-valuenow',
      progressPercentage.toString()
    )
    expect(progressBar).toHaveAttribute('aria-valuemin', '0')
    expect(progressBar).toHaveAttribute('aria-valuemax', '100')
  })

  it('handles negative currentQuestion gracefully', () => {
    const currentQuestion = -1
    const totalQuestions = 10
    const progressPercentage = 0

    const {getByRole} = render(
      <QuestionProgress
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
      />
    )

    const progressBar = getByRole('progressbar')

    expect(progressBar.style.width).toBe(`${progressPercentage}%`)
    expect(progressBar).toHaveAttribute(
      'aria-valuenow',
      progressPercentage.toString()
    )
  })

  it('handles currentQuestion greater than totalQuestions gracefully', () => {
    const currentQuestion = 15
    const totalQuestions = 10
    const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100

    const {getByRole} = render(
      <QuestionProgress
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
      />
    )

    const progressBar = getByRole('progressbar')

    expect(progressBar.style.width).toBe(`${progressPercentage}%`)
    expect(progressBar).toHaveAttribute(
      'aria-valuenow',
      progressPercentage.toString()
    )
  })

  it('handles zero currentQuestion gracefully', () => {
    const currentQuestion = 0
    const totalQuestions = 10
    const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100

    const {getByRole} = render(
      <QuestionProgress
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
      />
    )

    const progressBar = getByRole('progressbar')

    expect(progressBar.style.width).toBe(`${progressPercentage}%`)
    expect(progressBar).toHaveAttribute(
      'aria-valuenow',
      progressPercentage.toString()
    )
  })

  it('handles totalQuestions of 1 gracefully', () => {
    const currentQuestion = 0
    const totalQuestions = 1
    const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100

    const {getByRole} = render(
      <QuestionProgress
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
      />
    )

    const progressBar = getByRole('progressbar')

    expect(progressBar.style.width).toBe(`${progressPercentage}%`)
    expect(progressBar).toHaveAttribute(
      'aria-valuenow',
      progressPercentage.toString()
    )
  })
})
