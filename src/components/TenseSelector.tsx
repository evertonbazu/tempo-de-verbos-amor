
import React from 'react';
import { TenseType, tenses } from '@/utils/verbData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TenseSelectorProps {
  selectedTense: TenseType;
  onTenseChange: (tense: TenseType) => void;
}

const TenseSelector: React.FC<TenseSelectorProps> = ({ 
  selectedTense, 
  onTenseChange 
}) => {
  return (
    <div className="mb-8">
      <Tabs 
        defaultValue={selectedTense} 
        value={selectedTense} 
        onValueChange={(value) => onTenseChange(value as TenseType)} 
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          {tenses.map((tense) => (
            <TabsTrigger 
              key={tense.id} 
              value={tense.id}
              className="text-sm md:text-base"
            >
              {tense.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TenseSelector;
