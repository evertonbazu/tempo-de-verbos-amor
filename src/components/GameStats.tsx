
import React from 'react';
import { Heart, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GameStatsProps {
  lives: number;
  timeRemaining: number;
  className?: string;
}

const GameStats: React.FC<GameStatsProps> = ({
  lives,
  timeRemaining,
  className
}) => {
  // Format time as MM:SS
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
  // Create heart icons based on lives
  const hearts = Array(3).fill(0).map((_, i) => (
    <Heart 
      key={i} 
      className={cn(
        "transition-all duration-300", 
        i < lives ? "text-red-500 fill-red-500" : "text-gray-300"
      )}
    />
  ));

  return (
    <div className={cn("bg-white rounded-lg shadow p-4 mb-6", className)}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          {hearts}
        </div>
        
        <div className="flex items-center gap-2">
          <Timer className="text-ptblue" />
          <span className={cn(
            "font-mono text-xl font-bold", 
            timeRemaining <= 10 ? "text-red-500 animate-pulse" : "text-ptblue"
          )}>
            {formattedTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
