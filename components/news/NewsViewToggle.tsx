// components/ViewToggleSwitch.tsx
import { Switch } from '../ui/switch'

interface ViewToggleSwitchProps {
  view: 'list' | 'grid'
  onChange: (view: 'list' | 'grid') => void
}

const NewsViewToggle: React.FC<ViewToggleSwitchProps> = ({ view, onChange }) => {
  const handleSwitchChange = (checked: boolean) => {
    onChange(checked ? 'grid' : 'list')
  }

  return (
    <div className="flex items-center space-x-4">
      <span className="text-lg">List View</span>
      <Switch
        onCheckedChange={handleSwitchChange}
        checked={view === 'grid'}
        className="w-9"
      />
      <span className="text-lg">Grid View</span>
    </div>
  )
}

export default NewsViewToggle
