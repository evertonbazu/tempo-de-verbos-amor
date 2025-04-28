
import React from 'react';
import Header from '@/components/Header';
import ConjugationPractice from '@/components/ConjugationPractice';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <Header className="mb-8" />
      <div className="container mx-auto pb-12">
        <ConjugationPractice />
      </div>
    </div>
  );
};

export default Index;
