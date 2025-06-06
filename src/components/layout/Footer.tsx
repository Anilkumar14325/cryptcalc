import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="glass-effect py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-100">© 2025 CryptoCalc. All rights reserved.</p>
            <p className="text-xs text-gray-300 mt-1">
              This calculator is for educational purposes only. Not financial advice.
            </p>
          </div>
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="text-gray-300 hover:text-gray-100 transition-colors"
              aria-label="Github"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-gray-300 hover:text-gray-100 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;