import ReactDOM from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'

import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <App />,
    <SpeedInsights />,
  </>,
)
