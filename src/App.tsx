import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom'
import Home from './routes/Home'
import { AnimatePresence } from 'framer-motion'
import AnimatedRoute from './components/AnimatedRoute/AnimatedRoute'
import Layout from './components/Layout/Layout'
import About from './routes/About'
import Settings from './routes/Settings'
import { SettingsProvider } from './contexts/SettingsContext'

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<AnimatedRoute Route={Home} />} />
          <Route path="settings" element={<AnimatedRoute Route={Settings} />} />
          <Route path="about" element={<AnimatedRoute Route={About} />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
const App = () => {
  return (
    <SettingsProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </SettingsProvider>
  )
}

export default App
