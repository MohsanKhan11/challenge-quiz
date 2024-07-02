import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Options from './Options'

jest.mock('../../utils/decodeString', () => ({
  decodeString: jest.fn((str) => str)
}))

describe('Options Component', () => {
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4']
  const correctAnswer = 'Option 2'
  const handleAnswerClick = jest.fn()

  beforeEach(() => {
    handleAnswerClick.mockClear()
    require('../../utils/decodeString').decodeString.mockClear()
  })

  it('renders options correctly', () => {
    render(
      <Options
        options={options}
        showResult={false}
        correctAnswer={correctAnswer}
        handleAnswerClick={handleAnswerClick}
      />
    )

    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument()
    })
  })

  it('handles button clicks correctly', () => {
    render(
      <Options
        options={options}
        showResult={false}
        correctAnswer={correctAnswer}
        handleAnswerClick={handleAnswerClick}
      />
    )

    fireEvent.click(screen.getByText('Option 1'))
    expect(handleAnswerClick).toHaveBeenCalledWith('Option 1')

    fireEvent.click(screen.getByText('Option 2'))
    expect(handleAnswerClick).toHaveBeenCalledWith('Option 2')
  })

  it('disables buttons and shows correct styling on showResult', () => {
    render(
      <Options
        options={options}
        showResult={true}
        correctAnswer={correctAnswer}
        handleAnswerClick={handleAnswerClick}
      />
    )

    options.forEach((option) => {
      const button = screen.getByText(option)
      expect(button).toBeDisabled()
      if (option === correctAnswer) {
        expect(button).toHaveClass('btn-success')
      } else {
        expect(button).toHaveClass('btn-danger')
      }
    })
  })

  it('does not call handleAnswerClick when buttons are disabled', () => {
    render(
      <Options
        options={options}
        showResult={true}
        correctAnswer={correctAnswer}
        handleAnswerClick={handleAnswerClick}
      />
    )

    fireEvent.click(screen.getByText('Option 1'))
    expect(handleAnswerClick).not.toHaveBeenCalled()

    fireEvent.click(screen.getByText('Option 2'))
    expect(handleAnswerClick).not.toHaveBeenCalled()
  })

  it('decodes the options correctly using decodeString', () => {
    const {decodeString} = require('../../utils/decodeString')
    render(
      <Options
        options={options}
        showResult={false}
        correctAnswer={correctAnswer}
        handleAnswerClick={handleAnswerClick}
      />
    )

    options.forEach((option) => {
      expect(decodeString).toHaveBeenCalledWith(option)
    })
  })
})
