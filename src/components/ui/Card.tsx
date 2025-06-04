import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div 
      className={`glass-effect rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-800/50 ${className}`}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200/10 dark:border-gray-700/50">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;