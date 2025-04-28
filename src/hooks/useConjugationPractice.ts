import { useState, useEffect } from 'react';
import { Verb, TenseType, getRandomVerb, getRandomPronoun, pronouns } from '../utils/verbData';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ConjugationState {
  verb: Verb;
  pronoun: string;
  isCorrect: boolean | null;
  showAnswer: boolean;
  tense: TenseType;
  score: number;
  streak: number;
  attempts: number;
  maxAttempts: number;
  pronounLabel: string;
  studentName: string | null;
}

const tenses: TenseType[] = ['presente', 'preterito', 'futuro'];
let lastTenseIndex = -1;

const getNextTense = (): TenseType => {
  // Cycle through tenses in order but start at random position
  if (lastTenseIndex === -1) {
    lastTenseIndex = Math.floor(Math.random() * 3);
  } else {
    lastTenseIndex = (lastTenseIndex + 1) % 3;
  }
  return tenses[lastTenseIndex];
};

export const useConjugationPractice = () => {
  const [state, setState] = useState<ConjugationState>(() => {
    const initialTense = getNextTense();
    return {
      verb: getRandomVerb(),
      pronoun: getRandomPronoun(),
      isCorrect: null,
      showAnswer: false,
      tense: initialTense,
      score: 0,
      streak: 0,
      attempts: 0,
      maxAttempts: 10,
      pronounLabel: '',
      studentName: null
    };
  });
  
  const { toast } = useToast();

  useEffect(() => {
    const selectedPronoun = pronouns.find(p => p.id === state.pronoun);
    setState(prevState => ({
      ...prevState,
      pronounLabel: selectedPronoun ? selectedPronoun.label : ''
    }));
  }, [state.pronoun]);

  const checkAnswer = (selectedTense: TenseType) => {
    const isCorrect = selectedTense === state.tense;
    
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
        description: `A resposta correta é: ${state.tense}`,
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
    const nextTense = getNextTense();
    const selectedPronoun = pronouns.find(p => p.id === newPronoun);
    
    setState({
      ...state,
      verb: newVerb,
      pronoun: newPronoun,
      pronounLabel: selectedPronoun ? selectedPronoun.label : '',
      tense: nextTense,
      isCorrect: null,
      showAnswer: false
    });
  };

  const resetGame = () => {
    lastTenseIndex = -1; // Reset tense cycle
    const initialTense = getNextTense();
    const newVerb = getRandomVerb();
    const newPronoun = getRandomPronoun();
    const selectedPronoun = pronouns.find(p => p.id === newPronoun);
    
    setState({
      verb: newVerb,
      pronoun: newPronoun,
      pronounLabel: selectedPronoun ? selectedPronoun.label : '',
      isCorrect: null,
      showAnswer: false,
      tense: initialTense,
      score: 0,
      streak: 0,
      attempts: 0,
      maxAttempts: 10,
      studentName: state.studentName // Keep the student name when resetting
    });
  };

  const getCorrectAnswer = () => {
    return state.verb.conjugations[state.tense][state.pronoun as keyof typeof state.verb.conjugations[typeof state.tense]];
  };

  const setStudentName = (name: string) => {
    setState(prev => ({
      ...prev,
      studentName: name
    }));
  };

  const savePracticeResult = async () => {
    if (!state.studentName) return;
    
    try {
      await supabase.from('practice_results').insert({
        student_name: state.studentName,
        score: state.score,
        attempts: state.attempts
      });
    } catch (error) {
      console.error('Error saving practice results:', error);
    }
  };

  useEffect(() => {
    if (state.attempts >= state.maxAttempts) {
      savePracticeResult();
    }
  }, [state.attempts, state.maxAttempts, state.score, state.studentName]);

  return {
    ...state,
    checkAnswer,
    nextVerb,
    resetGame,
    getCorrectAnswer,
    isGameOver: state.attempts >= state.maxAttempts,
    setStudentName
  };
};
