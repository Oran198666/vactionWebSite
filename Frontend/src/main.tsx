import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { interceptor } from './utils/interceptor.ts'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

interceptor.create();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
