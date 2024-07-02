import React from 'react'
import {render, fireEvent, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { QuizProvider } from '../../context/QuizProvider'
import QuestionComponent from './Questions'


jest.mock('../../constants/questions.json', () => [
  {
    category: 'Science',
    type: 'multiple',
    difficulty: 'easy',
    question: 'What is the boiling point of water?',
    correct_answer: '100°C',
    incorrect_answers: ['90°C', '110°C', '120°C']
  },
  {
    category: 'Math',
    type: 'multiple',
    difficulty: 'easy',
    question: 'What is 2+2?',
    correct_answer: '4',
    incorrect_answers: ['3', '5', '6']
  }
])

describe('QuestionComponent', () => {
  const renderWithProvider = (ui) => {
    return render(<QuizProvider>{ui}</QuizProvider>)
  }

  it('renders without crashing', () => {
    renderWithProvider(<QuestionComponent />)
  })

  it('displays the first question and options', () => {
    renderWithProvider(<QuestionComponent />)
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument()
    expect(
      screen.getByText('What is the boiling point of water?')
    ).toBeInTheDocument()
    expect(screen.getByText('100°C')).toBeInTheDocument()
    expect(screen.getByText('90°C')).toBeInTheDocument()
    expect(screen.getByText('110°C')).toBeInTheDocument()
    expect(screen.getByText('120°C')).toBeInTheDocument()
  })

  it('updates state and shows result on answering a question', async () => {
    renderWithProvider(<QuestionComponent />)
    fireEvent.click(screen.getByText('100°C'))
    await waitFor(() =>
      expect(screen.getByText('Correct!')).toBeInTheDocument()
    )
  })

  it('navigates to the next question when "Next Question" is clicked', async () => {
    renderWithProvider(<QuestionComponent />)
    fireEvent.click(screen.getByText('100°C'))
    fireEvent.click(screen.getByText('Next Question'))
    await waitFor(() =>
      expect(screen.getByText('Question 2 of 2')).toBeInTheDocument()
    )
    expect(screen.getByText('What is 2+2?')).toBeInTheDocument()
  })

  it('displays the completion message at the end of the quiz', async () => {
    renderWithProvider(<QuestionComponent />)
    fireEvent.click(screen.getByText('100°C'))
    fireEvent.click(screen.getByText('Next Question'))
    fireEvent.click(screen.getByText('4'))
    await waitFor(() =>
      expect(screen.getByText('Quiz Completed!')).toBeInTheDocument()
    )
  })

  it('displays correct score and max score', async () => {
    renderWithProvider(<QuestionComponent />)
    fireEvent.click(screen.getByText('100°C'))
    await waitFor(() => {
      expect(screen.getByText('Score: 100.00%')).toBeInTheDocument()
      expect(screen.getByText('Max Score: 100.00%')).toBeInTheDocument()
    })
  })

  it('handles empty questionsData gracefully', () => {
    jest.mock('../../constants/questions.json', () => [])
    renderWithProvider(<QuestionComponent />)
    expect(screen.queryByText('Question')).not.toBeInTheDocument()
  })

  it('handles invalid answers gracefully', async () => {
    renderWithProvider(<QuestionComponent />)
    fireEvent.click(screen.getByText('90°C'))
    await waitFor(() => expect(screen.getByText('Sorry!')).toBeInTheDocument())
    fireEvent.click(screen.getByText('Next Question'))
    fireEvent.click(screen.getByText('3'))
    await waitFor(() => expect(screen.getByText('Sorry!')).toBeInTheDocument())
  })

  it('does not crash when navigating past the last question', async () => {
    renderWithProvider(<QuestionComponent />)
    fireEvent.click(screen.getByText('100°C'))
    fireEvent.click(screen.getByText('Next Question'))
    fireEvent.click(screen.getByText('4'))
    await waitFor(() =>
      expect(screen.queryByText('Next Question')).not.toBeInTheDocument()
    )
  })
})
