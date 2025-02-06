import { Settings, useSettings } from '../contexts/SettingsContext'
import { Label } from '../components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'

export default function SettingsPage() {
  const { settings, setSettings, saveSettings } = useSettings()
  const navigate = useNavigate()

  const handleChange = (key: keyof Settings, value: string) => {
    // @ts-ignore
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    saveSettings()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 p-6 rounded-lg text-white">
        <h1 className="text-2xl font-bold mb-6">Visualization Settings</h1>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="barColor">Pivot Color</Label>
            <Input
              id="barColor"
              type="color"
              value={settings.barColor}
              onChange={(e) => handleChange('barColor', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comparisionColor">Comparison Color</Label>
            <Input
              id="comparisionColor"
              type="color"
              value={settings.comparisionColor}
              onChange={(e) => handleChange('comparisionColor', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="swapColor">Active Color</Label>
            <Input
              id="swapColor"
              type="color"
              value={settings.swapColor}
              onChange={(e) => handleChange('swapColor', e.target.value)}
            />
          </div>
          <div className="flex justify-between pt-4">
            <Link to="/">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
