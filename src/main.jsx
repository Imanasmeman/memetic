import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './contexts/Authcontexts.jsx'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import CloudinaryUpload from './components/imageupload.jsx'
import MemeEditor from './MemeEditer.jsx'
import MemeScroller from './Memescroll.jsx'
import Navbar from './components/Navbar.jsx'


createRoot(document.getElementById('root')).render(
      <BrowserRouter>

  <AuthProvider>
    
<App />
   
  </AuthProvider>
</BrowserRouter>
 
)
