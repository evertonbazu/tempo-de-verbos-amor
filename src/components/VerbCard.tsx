
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Verb, TenseType } from '@/utils/verbData';

interface VerbCardProps {
  verb: Verb;
  pronoun: string;
  pronounLabel: string;
  tense: TenseType;
  isCorrect: boolean | null;
  showAnswer: boolean;
  onCheck: (selectedTense: TenseType) => void;
  onNext: () => void;
  sentence: string;
  highlightedVerb: string;
}

const VerbCard: React.FC<VerbCardProps> = ({
  verb,
  tense,
  isCorrect,
  showAnswer,
  onCheck,
  onNext,
  sentence,
  highlightedVerb
}) => {
  const formatSentence = () => {
    if (!sentence || !highlightedVerb) return '';
    
    return sentence.replace(
      highlightedVerb, 
      `**${highlightedVerb}**`
    );
  };

  return (
    <div className="verb-card space-y-6">
      <p className="text-lg text-center">
        {formatSentence().split('**').map((part, i) => (
          i % 2 === 0 ? part : <strong key={i} className="text-ptblue">{part}</strong>
        ))}
      </p>
      
      <div className="flex flex-col items-center gap-4">
        {!showAnswer ? (
          <div className="flex gap-2 justify-center">
            <Button 
              onClick={() => onCheck('presente')}
              variant="outline"
              size="lg"
              className={cn(
                "font-medium",
                isCorrect === null ? "" : 
                isCorrect && tense === 'presente' ? "bg-ptgreen text-white hover:bg-ptgreen-dark" : ""
              )}
            >
              Presente
            </Button>
            <Button 
              onClick={() => onCheck('preterito')}
              variant="outline"
              size="lg"
              className={cn(
                "font-medium",
                isCorrect === null ? "" : 
                isCorrect && tense === 'preterito' ? "bg-ptgreen text-white hover:bg-ptgreen-dark" : ""
              )}
            >
              Passado
            </Button>
            <Button 
              onClick={() => onCheck('futuro')}
              variant="outline"
              size="lg"
              className={cn(
                "font-medium",
                isCorrect === null ? "" : 
                isCorrect && tense === 'futuro' ? "bg-ptgreen text-white hover:bg-ptgreen-dark" : ""
              )}
            >
              Futuro
            </Button>
          </div>
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
