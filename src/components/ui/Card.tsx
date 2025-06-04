import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div 
      className={`glass-effect rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-800/80 ${className}`}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200/20 dark:border-gray-700/50">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
        </div>
      )}
      <div className="p-6 text-gray-800 dark:text-gray-200">
        {children}
      </div>
    </div>
  );
};

export default Card;