import React from 'react'

import { decodeString } from '../../utils/decodeString'

const Options = ({ options, showResult, correctAnswer, handleAnswerClick }) => {
  return (
    <div className='row'>
      {options.map((option, index) => (
        <div key={index} className='col-6 d-flex justify-content-center mb-2'>
          <button
            className={`btn btn-outline-secondary w-100 ${
              showResult &&
              (option === correctAnswer ? 'btn-success' : 'btn-danger')
            }`}
            onClick={() => handleAnswerClick(option)}
            disabled={showResult}
          >
            {decodeString(option)}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Options
