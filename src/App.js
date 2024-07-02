import React from 'react'

import Questions from './components/Questions/Questions'

import './App.css'
import { QuizProvider } from './context/QuizProvider'

function App() {
  return <QuizProvider><Questions /></QuizProvider>
}

export default App
