import React from 'react'

const AnswerProgress = ({
  scorePercentage,
  maxPossibleScore,
  minPossibleScore
}) => {
  return (
    <>
      <div
        className='progress-bar bg-dark'
        role='progressbar'
        style={{ width: `${minPossibleScore}%` }}
        aria-valuenow={minPossibleScore}
        aria-valuemin='0'
        aria-valuemax='100'
      />
      <div
        className='progress-bar bg-info'
        role='progressbar'
        style={{ width: `${scorePercentage}%` }}
        aria-valuenow={scorePercentage}
        aria-valuemin='0'
        aria-valuemax='100'
      />
      <div
        className='progress-bar bg-secondary'
        role='progressbar'
        style={{ width: `${maxPossibleScore - scorePercentage}%` }}
        aria-valuenow={maxPossibleScore - scorePercentage}
        aria-valuemin='0'
        aria-valuemax='100'
      />
    </>
  )
}

export default AnswerProgress
