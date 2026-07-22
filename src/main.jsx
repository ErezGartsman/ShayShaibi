import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Stop the browser's own scroll-position memory from fighting React Router's
// scroll handling (ScrollToTop.jsx) on refresh/back-forward navigation.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
