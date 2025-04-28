
import { useState, useEffect } from 'react';
import { Verb, TenseType, getRandomVerb, getRandomPronoun, pronouns } from '../utils/verbData';
import { useToast } from '@/components/ui/use-toast';

interface ConjugationState {
  verb: Verb;
  pronoun: string;
  userInput: string;
  isCorrect: boolean | null;
  showAnswer: boolean;
  tense: TenseType;
  score: number;
  streak: number;
  attempts: number;
  maxAttempts: number;
  pronounLabel: string;
}

export const useConjugationPractice = (initialTense: TenseType = 'presente') => {
  const [state, setState] = useState<ConjugationState>({
    verb: getRandomVerb(),
    pronoun: getRandomPronoun(),
    userInput: '',
    isCorrect: null,
    showAnswer: false,
    tense: initialTense,
    score: 0,
    streak: 0,
    attempts: 0,
    maxAttempts: 10,
    pronounLabel: ''
  });
  
  const { toast } = useToast();

  useEffect(() => {
    const selectedPronoun = pronouns.find(p => p.id === state.pronoun);
    setState(prevState => ({
      ...prevState,
      pronounLabel: selectedPronoun ? selectedPronoun.label : ''
    }));
  }, [state.pronoun]);

  const checkAnswer = () => {
    if (state.userInput.trim() === '') return;
    
    const correctAnswer = state.verb.conjugations[state.tense][state.pronoun as keyof typeof state.verb.conjugations[typeof state.tense]];
    const isCorrect = state.userInput.trim().toLowerCase() === correctAnswer.toLowerCase();
    
    let newScore = state.score;
    let newStreak = state.streak;
    
    if (isCorrect) {
      newScore += 10;
      newStreak += 1;
      toast({
        title: "Correto!",
        description: `+10 pontos! Racha de ${newStreak}!`,
        variant: "default",
      });
    } else {
      newStreak = 0;
      toast({
        title: "Incorreto",
        description: `A resposta correta é: ${correctAnswer}`,
        variant: "destructive",
      });
    }
    
    setState({
      ...state,
      isCorrect,
      showAnswer: true,
      score: newScore,
      streak: newStreak,
      attempts: state.attempts + 1
    });
  };

  const nextVerb = () => {
    const newVerb = getRandomVerb();
    const newPronoun = getRandomPronoun();
    const selectedPronoun = pronouns.find(p => p.id === newPronoun);
    
    setState({
      ...state,
      verb: newVerb,
      pronoun: newPronoun,
      pronounLabel: selectedPronoun ? selectedPronoun.label : '',
      userInput: '',
      isCorrect: null,
      showAnswer: false
    });
  };

  const setTense = (newTense: TenseType) => {
    setState({
      ...state,
      tense: newTense,
      userInput: '',
      isCorrect: null,
      showAnswer: false
    });
  };

  const updateUserInput = (input: string) => {
    setState({
      ...state,
      userInput: input,
      isCorrect: null
    });
  };

  const resetGame = () => {
    const newVerb = getRandomVerb();
    const newPronoun = getRandomPronoun();
    const selectedPronoun = pronouns.find(p => p.id === newPronoun);
    
    setState({
      verb: newVerb,
      pronoun: newPronoun,
      pronounLabel: selectedPronoun ? selectedPronoun.label : '',
      userInput: '',
      isCorrect: null,
      showAnswer: false,
      tense: initialTense,
      score: 0,
      streak: 0,
      attempts: 0,
      maxAttempts: 10
    });
  };

  const getCorrectAnswer = () => {
    return state.verb.conjugations[state.tense][state.pronoun as keyof typeof state.verb.conjugations[typeof state.tense]];
  };

  const isGameOver = state.attempts >= state.maxAttempts;

  return {
    ...state,
    checkAnswer,
    nextVerb,
    setTense,
    updateUserInput,
    resetGame,
    getCorrectAnswer,
    isGameOver
  };
};
