
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface LeaderboardTableProps {
  results: {
    student_name: string;
    score: number;
    attempts: number;
    created_at: string;
  }[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ results }) => {
  return (
    <ScrollArea className="h-[400px] w-full rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">#</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead className="text-right">Pontuação</TableHead>
            <TableHead className="text-right">Quando</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => (
            <TableRow key={index}>
              <TableCell className="text-center font-medium">{index + 1}</TableCell>
              <TableCell>{result.student_name}</TableCell>
              <TableCell className="text-right">{result.score}</TableCell>
              <TableCell className="text-right">
                {formatDistanceToNow(new Date(result.created_at), {
                  addSuffix: true,
                  locale: ptBR
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default LeaderboardTable;
