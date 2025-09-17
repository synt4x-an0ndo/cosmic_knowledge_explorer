import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="border-b border-border bg-card/50">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-3 min-w-0 flex-shrink-0 cosmic-transition border-b-2 ${
              activeTab === tab?.id
                ? 'text-primary border-primary bg-primary/5' :'text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/30'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="font-caption text-sm font-medium whitespace-nowrap">
              {tab?.label}
            </span>
            {tab?.badge && (
              <div className="w-2 h-2 rounded-full bg-aurora-green animate-cosmic-pulse"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;