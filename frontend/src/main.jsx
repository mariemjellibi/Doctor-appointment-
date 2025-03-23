import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import store from './redux/store'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="878359082505-hs6qbfbvf1hcqa0dbn3md6n1cvqn9hjv.apps.googleusercontent.com">
         <App />
         </GoogleOAuthProvider>
    </Provider>
 
  </StrictMode>,
)
