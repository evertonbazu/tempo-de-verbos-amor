
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  className
}) => {
  return (
    <header className={cn("py-6 text-center", className)}>
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ptblue">
          Jogo dos Verbos
        </h1>
      </div>
    </header>
  );
};

export default Header;
