import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div 
      className={`bg-white rounded-xl shadow-md overflow-hidden backdrop-blur-sm bg-opacity-95 border border-gray-100 transition-all hover:shadow-lg ${className}`}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;