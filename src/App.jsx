import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import BookDetailPage from './pages/BookDetailPage'
import CollectionPage from './pages/CollectionPage'
const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/book/:id' element={<BookDetailPage/>}/>
        <Route path='/collection' element={<CollectionPage/>} />
      </Routes>
    </div>
  )
}

export default App