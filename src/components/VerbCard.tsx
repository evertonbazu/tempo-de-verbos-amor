
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

  const getExampleSentence = () => {
    switch (verb.infinitive) {
      case 'falar':
        return 'Eu sempre **falo** com meus amigos no parque.';
      case 'comer':
        return 'Nós **comemos** feijoada aos sábados.';
      case 'partir':
        return 'O trem **parte** da estação às 8 horas.';
      case 'ser':
        return 'Ele **é** um ótimo professor.';
      case 'ter':
        return 'Eles **têm** muitos livros em casa.';
      default:
        return '';
    }
  };
  
  useEffect(() => {
    inputRef.current?.focus();
  }, [verb.infinitive, pronoun]);
  
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
  
  useEffect(() => {
    if (isCorrect !== null) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isCorrect]);

  return (
    <div className="verb-card space-y-6">
      <p className="text-lg text-center">
        {getExampleSentence().split('**').map((part, i) => (
          i % 2 === 0 ? part : <strong key={i} className="text-ptblue">{part}</strong>
        ))}
      </p>
      
      <div className="flex flex-col items-center gap-4">
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
              isCorrect === null ? "input-neutral" :
              isCorrect ? "input-correct" : "input-incorrect"
            )}
            placeholder="Digite a conjugação"
          />
        </div>
        
        {showAnswer && !isCorrect && (
          <p className="text-destructive font-medium">
            Resposta correta: <span className="font-bold">{correctAnswer}</span>
          </p>
        )}
        
        <div>
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
    </div>
  );
};

export default VerbCard;

