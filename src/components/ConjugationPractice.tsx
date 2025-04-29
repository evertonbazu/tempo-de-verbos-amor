
import React from 'react';
import { useConjugationPractice } from '@/hooks/useConjugationPractice';
import VerbCard from './VerbCard';
import ScoreDisplay from './ScoreDisplay';
import GameStats from './GameStats';
import WelcomeScreen from './WelcomeScreen';
import LeaderboardTable from './LeaderboardTable';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from './ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const getEncouragingMessage = (score: number) => {
  if (score >= 80) return "Excelente! Você é incrível! 🌟";
  if (score >= 60) return "Muito bom! Continue assim! 🎉";
  if (score >= 40) return "Bom trabalho! Você está progredindo! 💪";
  return "Continue praticando, você vai melhorar! 🌱";
};

const ConjugationPractice: React.FC = () => {
  const practice = useConjugationPractice();
  
  const { data: leaderboard = [] } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const { data } = await supabase
        .from('practice_results')
        .select('*')
        .order('score', { ascending: false })
        .limit(30);
      return data || [];
    },
  });

  if (!practice.studentName) {
    return <WelcomeScreen onStart={practice.setStudentName} />;
  }

  if (practice.isGameOver) {
    let gameOverReason = "";
    if (practice.lives <= 0) {
      gameOverReason = "Você perdeu todas as vidas!";
    } else if (practice.timeRemaining <= 0) {
      gameOverReason = "O tempo acabou!";
    }
    
    const percentage = (practice.score / (practice.attempts * 10)) * 100;
    const message = getEncouragingMessage(percentage);

    return (
      <div className="max-w-3xl mx-auto px-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Prática Concluída!</CardTitle>
            <CardDescription>
              {gameOverReason}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-5xl font-bold text-ptblue mb-4">
                {practice.score} pontos
              </div>
              <p className="text-muted-foreground mb-4">
                Você completou {practice.sentencesAnswered} frases!
              </p>
              <p className="text-xl font-medium text-ptgreen mb-8">
                {message}
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

        <Card>
          <CardHeader>
            <CardTitle>Melhores Pontuações</CardTitle>
            <CardDescription>
              Os 30 melhores resultados de todos os tempos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeaderboardTable results={leaderboard} />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4">
      <GameStats 
        lives={practice.lives}
        timeRemaining={practice.timeRemaining}
        className="mb-3"
      />
      
      <ScoreDisplay 
        score={practice.score}
        streak={practice.streak}
        attempts={practice.attempts}
        maxAttempts={practice.maxAttempts}
        className="mb-6"
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
        sentence={practice.currentSentence.sentence}
        highlightedVerb={practice.currentSentence.verb}
      />
    </div>
  );
};

export default ConjugationPractice;
