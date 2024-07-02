import React from 'react'

import ProgressBar from '../Progress/AnswerProgress'
import QuestionProgress from '../Progress/QuestionProgress'
import Options from '../Options/Options'
import { Container, QuestionCard } from './Question'
import { useQuiz } from '../../context/QuizProvider'

import { decodeString } from '../../utils/decodeString'
import getStars from '../../utils/getStars'

const QuestionComponent = () => {
  const {
    currentQuestion,
    totalQuestions,
    questionText,
    question,
    difficulty,
    options,
    selectedAnswer,
    showResult,
    correctAnswer,
    scorePercentage,
    maxPossibleScore,
    minPossibleScore,
    handleAnswerClick,
    handleNextQuestion
  } = useQuiz()

  return (
    <Container>
      <QuestionProgress
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
      />
      <QuestionCard>
        <h2>
          Question {currentQuestion + 1} of {totalQuestions}
        </h2>
        <p className='text-muted'>{decodeString(question.category)}</p>
        <div>{getStars(difficulty)}</div>
        <p>{decodeString(questionText)}</p>
        <div className='container'>
          <Options
            options={options}
            showResult={showResult}
            correctAnswer={correctAnswer}
            handleAnswerClick={handleAnswerClick}
          />
        </div>
        {showResult && (
          <div className='mt-3 text-center'>
            <h3>{selectedAnswer === correctAnswer ? 'Correct!' : 'Sorry!'}</h3>
            {currentQuestion < totalQuestions - 1 ? (
              <button
                className='btn btn-outline-secondary mt-2'
                onClick={handleNextQuestion}
              >
                Next Question
              </button>
            ) : (
              <h4>Quiz Completed!</h4>
            )}
          </div>
        )}
      </QuestionCard>
      <div className='w-100'>
        <div className='d-flex justify-content-between'>
          <span>Score: {scorePercentage.toFixed(2)}%</span>
          <span>Max Score: {maxPossibleScore.toFixed(2)}%</span>
        </div>
        <div className='progress'>
          <ProgressBar
            scorePercentage={scorePercentage}
            maxPossibleScore={maxPossibleScore}
            minPossibleScore={minPossibleScore}
          />
        </div>
      </div>
    </Container>
  )
}

export default QuestionComponent
