import React, { createContext, useContext, useState } from 'react'

import questionsData from '../constants/questions.json'

const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)
  const question = questionsData[currentQuestion]
  const {
    question: questionText,
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
    difficulty
  } = question
  const options = [correctAnswer, ...incorrectAnswers].sort()
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer)
    setShowResult(true)
    setTotalAnswered((prevTotal) => prevTotal + 1)
    if (answer === correctAnswer) {
      setCorrectAnswers((prevCorrect) => prevCorrect + 1)
    }
  }
  const handleNextQuestion = () => {
    setShowResult(false)
    setSelectedAnswer(null)
    setCurrentQuestion((prevQuestion) => prevQuestion + 1)
  }
  const totalQuestions = questionsData.length
  const scorePercentage = totalAnswered
    ? (correctAnswers / totalAnswered) * 100
    : 0
  const maxPossibleScore =
    ((correctAnswers + (totalQuestions - totalAnswered)) / totalQuestions) * 100

  const minPossibleScore = (correctAnswers / totalQuestions) * 100

  return (
    <QuizContext.Provider
      value={{
        currentQuestion,
        totalQuestions,
        questionText,
        question,
        correctAnswer,
        incorrectAnswers,
        difficulty,
        options,
        selectedAnswer,
        showResult,
        correctAnswers,
        totalAnswered,
        scorePercentage,
        maxPossibleScore,
        minPossibleScore,
        handleAnswerClick,
        handleNextQuestion
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export const useQuiz = () => useContext(QuizContext)
