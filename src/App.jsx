import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
import Reviews from './pages/Reviews'
import NewReview from './pages/NewReview'
import './index.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/reviews" replace />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/newreview" element={<NewReview />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App