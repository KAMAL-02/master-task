import React from 'react';
import { Switch } from '@/components/ui/switch';
import { ViewType } from '../../types/news/newsTypes';
import { List, Grid } from 'lucide-react';

interface ViewToggleSwitchProps {
  view: ViewType;
  onChange: (view: ViewType) => void;
}

export const NewsViewToggle: React.FC<ViewToggleSwitchProps> = ({ view, onChange }) => {
  const handleSwitchChange = (checked: boolean) => {
    onChange(checked ? 'grid' : 'list');
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-1">
        <List className="w-4 h-4" />
        <span className="text-sm">List View</span>
      </div>
      <Switch
        onCheckedChange={handleSwitchChange}
        checked={view === 'grid'}
        className="w-8 h-4"
      />
      <div className="flex items-center space-x-1">
        <Grid className="w-4 h-4" />
        <span className="text-sm">Grid View</span>
      </div>
    </div>
  );
};
