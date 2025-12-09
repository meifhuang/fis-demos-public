"use client"

import ListView from "../_components/List";
import QuizListRecord from "./_components/QuizListRecord";
import { QuizRecord } from "@/types/demos/quiz-generator";
import { useQuizList } from "./_store";

export default function QuizGeneratorDemoPage() {
  const { data: quizzes, isLoading, isError, error } = useQuizList();
  
    if (isError) {
      return <p>Error loading courses: {error.message}</p>;
    }

  return (
    <ListView<QuizRecord>
          records={quizzes ?? []}
          title="Quiz Generator"
          createNewRoute="/quiz-generator/create"
          RenderItem={QuizListRecord}
          isLoading={isLoading}
        />
  )
}
