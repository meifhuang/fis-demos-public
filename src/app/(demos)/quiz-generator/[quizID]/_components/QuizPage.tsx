'use client';

import {
  Button,
  Pagination,
  PaginationItem,
  PaginationItemRenderProps,
  PaginationItemType,
} from "@heroui/react";
import QuestionView from "./Question";
import { Quiz } from "../../_models";
import { Dispatch, SetStateAction } from "react";

type quizProps = {
  quiz: Quiz
  questionIndex: number
  setQuestionIndex: Dispatch<SetStateAction<number>>
  handleCorrectAnswerChange: (questionIndex: number) => (answerIndex: number) => void
  complete: () => void
}

export default function QuizPage({ quiz, questionIndex, setQuestionIndex, handleCorrectAnswerChange, complete }: quizProps) {
  const renderButton = ({ref, key, value, isActive, onNext, onPrevious, setPage, className}: PaginationItemRenderProps) => {
    const isCompleted =
      typeof value === "number" &&
      quiz.questions[value - 1]?.answers.some(a => a.correct);

    const completedClass = isCompleted
      ? "bg-blue-200 border border-blue-400"
      : ""


    const changePage = 
      value === PaginationItemType.DOTS ? () => {}
      : value === PaginationItemType.NEXT ? onNext
      : value === PaginationItemType.PREV ? onPrevious
      : () => setPage(value)

    const text = 
      value === PaginationItemType.DOTS ? "..."
      : value === PaginationItemType.NEXT ? ">"
      : value === PaginationItemType.PREV ? "<"
      : value

    return (
      <PaginationItem
        ref={ref}
        key={key}
        value={value}
        isActive={isActive}
        className={`${className} ${completedClass}`}
        onPress={changePage}
      >{text}</PaginationItem>
    )
  };

  const hasCompletedQuiz = quiz.questions.every(question => question.answers.some(answer => answer.correct))
  const isFinalQuestion = questionIndex + 1 === quiz.questionCount

  return (
    <div className="max-w-5xl mx-auto font-inter min-h-screen w-full flex flex-col gap-2">
      <Pagination 
        className="self-center max-w-full"
        classNames={{
          cursor: "border-2 border-blue-400 bg-white text-black"
        }}
        page={questionIndex + 1} 
        total={quiz.questionCount} onChange={i => setQuestionIndex(i - 1)}
        renderItem={renderButton}
        boundaries={5}
      />
      <QuestionView 
        question={quiz.questions[questionIndex]} 
        handleCorrectAnswerChange={handleCorrectAnswerChange(questionIndex)}
      />

      <div className="flex flex-row justify-between mt-1">
      <Button isDisabled={questionIndex === 0} onPress={() => setQuestionIndex(v => v - 1)}>Previous</Button>
      {
        isFinalQuestion
        ? <Button className="bg-blue-500 text-white" isDisabled={!hasCompletedQuiz} onPress={complete}>Complete</Button>
        : <Button className="bg-blue-500 text-white" isDisabled={isFinalQuestion} onPress={() => setQuestionIndex(v => v + 1)}>Next</Button>
      }
      </div>
    </div>
  );
}
