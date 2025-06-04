import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen animated-gradient text-gray-900 dark:text-gray-100">
      <div className="animated-bg">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;