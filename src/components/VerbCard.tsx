
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
  correctAnswer: string;
}

const VerbCard: React.FC<VerbCardProps> = ({
  verb,
  tense,
  isCorrect,
  showAnswer,
  onCheck,
  onNext
}) => {
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

  return (
    <div className="verb-card space-y-6">
      <p className="text-lg text-center">
        {getExampleSentence().split('**').map((part, i) => (
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
              Pretérito
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
