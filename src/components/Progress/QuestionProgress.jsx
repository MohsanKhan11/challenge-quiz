import React from 'react'

const QuestionProgress = ({ currentQuestion, totalQuestions }) => {
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100

  return (
    <div className='w-100 mb-4'>
      <div className='progress'>
        <div
          className='progress-bar bg-info'
          role='progressbar'
          style={{ width: `${progressPercentage}%` }}
          aria-valuenow={progressPercentage}
          aria-valuemin='0'
          aria-valuemax='100'
        />
      </div>
    </div>
  )
}

export default QuestionProgress
