import React from 'react'
import Form from './components/Form'
import CreativeDesign from './components/CreativeDesign'

function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-1/2 p-8 overflow-auto">
        <Form />
      </div>
      <div className="w-1/2">
        <CreativeDesign />
      </div>
    </div>
  )
}

export default App

