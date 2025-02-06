import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'

export interface Settings {
  barColor: string
  comparisionColor: string
  swapColor: string
}

const defaultSettings: Settings = {
  barColor: '#887dd8',
  comparisionColor: '#f4a162',
  swapColor: '#b54630',
}

interface SettingsContextType {
  settings: Settings
  setSettings: (newSettings: Settings) => void
  saveSettings: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
)

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<any>(() => {
    const savedSettings = localStorage.getItem('visualizationSettings')
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings
  })

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--highlight-compare-color',
      settings.comparisionColor,
    )
    document.documentElement.style.setProperty(
      '--highlight-active-color',
      settings.swapColor,
    )
    document.documentElement.style.setProperty(
      '--highlight-pivot-color',
      settings.barColor,
    )
  }, [settings])

  const saveSettings = () => {
    localStorage.setItem('visualizationSettings', JSON.stringify(settings))
  }

  return (
    <SettingsContext.Provider value={{ settings, setSettings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
