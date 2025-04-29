
import { useState, useEffect, useRef } from 'react';
import { Verb, TenseType, getRandomVerb, getRandomPronoun, pronouns, getRandomSentence, SentenceExample } from '../utils/verbData';
import { useToast } from '@/hooks/use-toast';
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
  currentSentence: SentenceExample;
  lives: number;
  timeRemaining: number;
  isTimerRunning: boolean;
  sentencesAnswered: number;
}

const INITIAL_LIVES = 3;
const INITIAL_TIME = 90;

const useConjugationPractice = () => {
  const [state, setState] = useState<ConjugationState>(() => {
    const initialSentence = getRandomSentence();
    return {
      verb: getRandomVerb(),
      pronoun: getRandomPronoun(),
      isCorrect: null,
      showAnswer: false,
      tense: initialSentence.tense,
      score: 0,
      streak: 0,
      attempts: 0,
      maxAttempts: 10,
      pronounLabel: '',
      studentName: null,
      currentSentence: initialSentence,
      lives: INITIAL_LIVES,
      timeRemaining: INITIAL_TIME,
      isTimerRunning: false,
      sentencesAnswered: 0
    };
  });
  
  const { toast } = useToast();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const selectedPronoun = pronouns.find(p => p.id === state.pronoun);
    setState(prevState => ({
      ...prevState,
      pronounLabel: selectedPronoun ? selectedPronoun.label : ''
    }));
  }, [state.pronoun]);

  // Timer effect
  useEffect(() => {
    if (state.isTimerRunning && state.timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
    } else if (state.timeRemaining <= 0 && state.isTimerRunning) {
      // Time's up!
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setState(prev => ({
        ...prev,
        isTimerRunning: false
      }));
      
      savePracticeResult();
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.isTimerRunning, state.timeRemaining]);

  const checkAnswer = (selectedTense: TenseType) => {
    const isCorrect = selectedTense === state.currentSentence.tense;
    
    let newScore = state.score;
    let newStreak = state.streak;
    let newLives = state.lives;
    let newSentencesAnswered = state.sentencesAnswered + 1;
    
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
      newLives -= 1;
      
      toast({
        title: "Incorreto",
        description: `A resposta correta é: ${state.currentSentence.tense === 'presente' ? 'Presente' : 
                                            state.currentSentence.tense === 'preterito' ? 'Passado' : 
                                            'Futuro'}`,
        variant: "destructive",
      });
      
      // If no lives left, end the game
      if (newLives <= 0) {
        setState({
          ...state,
          isCorrect,
          showAnswer: true,
          score: newScore,
          streak: newStreak,
          attempts: state.attempts + 1,
          lives: newLives,
          sentencesAnswered: newSentencesAnswered,
          isTimerRunning: false
        });
        
        savePracticeResult();
        return;
      }
    }
    
    setState({
      ...state,
      isCorrect,
      showAnswer: true,
      score: newScore,
      streak: newStreak,
      attempts: state.attempts + 1,
      lives: newLives,
      sentencesAnswered: newSentencesAnswered
    });
  };

  const nextVerb = () => {
    const newSentence = getRandomSentence();
    const selectedPronoun = pronouns.find(p => p.id === state.pronoun);
    
    setState({
      ...state,
      verb: getRandomVerb(),
      tense: newSentence.tense,
      isCorrect: null,
      showAnswer: false,
      currentSentence: newSentence
    });
  };

  const resetGame = () => {
    const initialSentence = getRandomSentence();
    const newVerb = getRandomVerb();
    const newPronoun = getRandomPronoun();
    const selectedPronoun = pronouns.find(p => p.id === newPronoun);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setState({
      verb: newVerb,
      pronoun: newPronoun,
      pronounLabel: selectedPronoun ? selectedPronoun.label : '',
      isCorrect: null,
      showAnswer: false,
      tense: initialSentence.tense,
      score: 0,
      streak: 0,
      attempts: 0,
      maxAttempts: 10,
      studentName: state.studentName, // Keep the student name when resetting
      currentSentence: initialSentence,
      lives: INITIAL_LIVES,
      timeRemaining: INITIAL_TIME,
      isTimerRunning: false,
      sentencesAnswered: 0
    });
  };

  const getCorrectAnswer = () => {
    return state.verb.conjugations[state.tense][state.pronoun as keyof typeof state.verb.conjugations[typeof state.tense]];
  };

  const setStudentName = (name: string) => {
    setState(prev => ({
      ...prev,
      studentName: name,
      isTimerRunning: true // Start timer when name is set
    }));
  };

  const savePracticeResult = async () => {
    if (!state.studentName) return;
    
    try {
      await supabase.from('practice_results').insert({
        student_name: state.studentName,
        score: state.score,
        attempts: state.attempts,
        sentences_answered: state.sentencesAnswered
      });
    } catch (error) {
      console.error('Error saving practice results:', error);
    }
  };

  useEffect(() => {
    if (state.lives <= 0 || state.timeRemaining <= 0) {
      savePracticeResult();
    }
  }, [state.lives, state.timeRemaining]);

  return {
    ...state,
    checkAnswer,
    nextVerb,
    resetGame,
    getCorrectAnswer,
    isGameOver: state.lives <= 0 || state.timeRemaining <= 0,
    setStudentName
  };
};

export { useConjugationPractice };
