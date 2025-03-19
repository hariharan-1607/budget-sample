import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-lg mt-auto">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center text-gray-600">
          <p className="flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by Budget Buddy Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;