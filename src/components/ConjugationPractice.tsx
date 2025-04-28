
import React from 'react';
import { useConjugationPractice } from '@/hooks/useConjugationPractice';
import VerbCard from './VerbCard';
import ScoreDisplay from './ScoreDisplay';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from './ui/button';

const ConjugationPractice: React.FC = () => {
  const practice = useConjugationPractice();
  
  if (practice.isGameOver) {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Prática Concluída!</CardTitle>
            <CardDescription>
              Vamos ver como você se saiu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-5xl font-bold text-ptblue mb-4">
                {practice.score} pontos
              </div>
              <p className="text-muted-foreground">
                Você completou {practice.attempts} conjugações!
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              onClick={practice.resetGame}
              className="bg-ptgreen hover:bg-ptgreen-dark"
              size="lg"
            >
              Jogar Novamente
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4">
      <ScoreDisplay 
        score={practice.score}
        streak={practice.streak}
        attempts={practice.attempts}
        maxAttempts={practice.maxAttempts}
      />
      
      <VerbCard
        verb={practice.verb}
        pronoun={practice.pronoun}
        pronounLabel={practice.pronounLabel}
        tense={practice.tense}
        isCorrect={practice.isCorrect}
        showAnswer={practice.showAnswer}
        onCheck={practice.checkAnswer}
        onNext={practice.nextVerb}
      />
    </div>
  );
};

export default ConjugationPractice;
