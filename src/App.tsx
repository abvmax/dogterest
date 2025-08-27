import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainPage } from './pages/MainPage/MainPage'
import { NotFound } from './pages/NotFound/NotFound'
import { Header } from './components/Header/Header'
import { TopScrollButton } from './ui/TopScrollButton/TopScrollButton'

function App() {

  return (
    <BrowserRouter>
      <div className='wrapper'>
        <Header />
        <main className="main">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/save" element={<MainPage />} />
          </Routes>
        </main>
      </div>
      <TopScrollButton />
    </BrowserRouter>
  )
}

export default App
