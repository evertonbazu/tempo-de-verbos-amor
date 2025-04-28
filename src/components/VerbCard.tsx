
import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Verb, TenseType } from '@/utils/verbData';

interface VerbCardProps {
  verb: Verb;
  pronoun: string;
  pronounLabel: string;
  tense: TenseType;
  userInput: string;
  isCorrect: boolean | null;
  showAnswer: boolean;
  onInputChange: (value: string) => void;
  onCheck: () => void;
  onNext: () => void;
  correctAnswer: string;
}

const VerbCard: React.FC<VerbCardProps> = ({
  verb,
  pronoun,
  pronounLabel,
  tense,
  userInput,
  isCorrect,
  showAnswer,
  onInputChange,
  onCheck,
  onNext,
  correctAnswer
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Focus input on mount and when verb changes
  useEffect(() => {
    inputRef.current?.focus();
  }, [verb.infinitive, pronoun]);
  
  // Handle key press events
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (!showAnswer) {
          onCheck();
        } else {
          onNext();
        }
      }
    };
    
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [showAnswer, onCheck, onNext]);
  
  // Handle input animation
  useEffect(() => {
    if (isCorrect !== null) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isCorrect]);
  
  const getTenseLabel = () => {
    switch (tense) {
      case 'presente': return 'Presente';
      case 'preterito': return 'Pretérito Perfeito';
      case 'futuro': return 'Futuro Simples';
      default: return tense;
    }
  };
  
  const getInputClasses = () => {
    if (isCorrect === null) return "input-neutral";
    return isCorrect ? "input-correct" : "input-incorrect";
  };

  return (
    <div className="verb-card">
      <div className="mb-4 pb-4 border-b">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">{getTenseLabel()}</span>
          <span className={cn(
            "text-sm font-medium px-2 py-1 rounded-full",
            verb.grupo === 'ar' ? "bg-blue-100 text-blue-800" :
            verb.grupo === 'er' ? "bg-green-100 text-green-800" :
            verb.grupo === 'ir' ? "bg-purple-100 text-purple-800" :
            "bg-amber-100 text-amber-800"
          )}>
            {verb.grupo === 'ar' ? "AR" : 
             verb.grupo === 'er' ? "ER" :
             verb.grupo === 'ir' ? "IR" : "Irregular"}
          </span>
        </div>
        <h3 className="text-2xl font-bold mt-1">{verb.infinitive}</h3>
        <p className="text-muted-foreground italic">{verb.translation}</p>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-col items-center">
          <h4 className="text-lg font-semibold mb-2">{pronounLabel}</h4>
          <div className={cn(
            "w-full max-w-xs transition-all",
            isAnimating && (isCorrect ? "animate-bounce-gentle" : "animate-shake")
          )}>
            <Input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => onInputChange(e.target.value)}
              disabled={showAnswer}
              className={cn(
                "text-center text-lg",
                getInputClasses()
              )}
              placeholder="Digite a conjugação"
            />
          </div>
          
          {showAnswer && !isCorrect && (
            <p className="mt-2 text-destructive font-medium">
              Resposta correta: <span className="font-bold">{correctAnswer}</span>
            </p>
          )}
        </div>
      </div>
      
      <div className="flex justify-center">
        {!showAnswer ? (
          <Button 
            onClick={onCheck}
            className="bg-ptblue hover:bg-ptblue-dark"
            size="lg"
          >
            Verificar
          </Button>
        ) : (
          <Button 
            onClick={onNext}
            className="bg-ptgreen hover:bg-ptgreen-dark"
            size="lg"
          >
            Próximo
          </Button>
        )}
      </div>
    </div>
  );
};

export default VerbCard;
