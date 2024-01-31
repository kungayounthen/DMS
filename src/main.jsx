import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { FileContextProvider } from './context/fileContext.jsx'
import { CredentialscontextProvider } from './context/credential.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <CredentialscontextProvider>
  <FileContextProvider>
  <App />
  </FileContextProvider>
  </CredentialscontextProvider>
  </BrowserRouter>
  </React.StrictMode>,
)
