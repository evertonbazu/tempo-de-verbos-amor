
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TenseType, tenses } from '@/utils/verbData';

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
      <div className="flex gap-2 justify-center">
        {tenses.map((tense) => (
          <Button
            key={tense.id}
            variant={selectedTense === tense.id ? "default" : "outline"}
            className={cn(
              "px-4 py-2 text-sm md:text-base font-medium",
              selectedTense === tense.id ? "bg-ptblue hover:bg-ptblue-dark" : ""
            )}
            onClick={() => onTenseChange(tense.id as TenseType)}
          >
            {tense.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TenseSelector;
