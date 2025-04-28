
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("py-6 text-center", className)}>
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ptblue">
          Jogo dos Verbos dos Prof. Everton E Edilaine!!!
        </h1>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">
          Pratique suas conjugações de verbos em português
        </p>
      </div>
    </header>
  );
};

export default Header;
