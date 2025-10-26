import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'
import Router from './router'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="545296675711-utj7sltd2g30oirk20v8e5umc9c2f2q7.apps.googleusercontent.com">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
