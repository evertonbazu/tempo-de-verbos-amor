
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ScoreDisplayProps {
  score: number;
  streak: number;
  attempts: number;
  maxAttempts: number;
  className?: string;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  streak,
  attempts,
  maxAttempts,
  className
}) => {
  const progressPercent = (attempts / maxAttempts) * 100;

  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Pontuação</h3>
          <p className="text-xl font-bold text-ptblue">{score}</p>
        </div>
        
        {streak > 0 && (
          <div className="flex items-center">
            <Badge className="bg-ptyellow text-black">
              <span className="animate-bounce-gentle inline-block mr-1">🔥</span> {streak}
            </Badge>
          </div>
        )}
        
        <div className="text-right">
          <h3 className="text-sm font-medium text-muted-foreground">Progresso</h3>
          <p className="text-xl font-bold text-ptblue">{attempts} / {maxAttempts}</p>
        </div>
      </div>
      
      <Progress value={progressPercent} className="h-2" />
    </div>
  );
};

export default ScoreDisplay;
