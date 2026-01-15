'use client';

import {
  Users,
  LayoutList,
} from "lucide-react";
import {
  Chip,
  Card,
  CardHeader,
  CardBody,
} from "@heroui/react";
import { LearnerProfileChip } from "@/lib/learner-profiles";
import { useParams } from "next/navigation";
import QuizOverviewSkeleton from "./_components/QuizSkeleton";
import QuestionSkeleton from "./_components/QuestionSkeleton";
import { useTakeQuiz } from "./_hooks/useTakeQuiz";
import QuizPage from "./_components/QuizPage";
import { useState } from "react";
import QuizReview from "./_components/QuizReview";

export default function QuizTeacherView() {
  const { quizID: id } = useParams<{ quizID: string }>();
  const { quiz, correctQuiz, isFetching, error, handleCorrectAnswerChange, getScore} = useTakeQuiz(id)
  const [state, setState] = useState<"Take" | "Review">("Take")
  const [questionIndex, setQuestionIndex] = useState(0);

  const startQuiz = () => setState("Take")
  const completeQuiz = () => setState("Review")

  if (error) {
    return (
      <div className="p-8 max-w-5xl mx-auto text-center text-red-600">
        <p>Error loading quiz: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto font-inter min-h-screen w-full">
      {isFetching && !quiz?.title ? (
        <QuizOverviewSkeleton />
      ) : (
        <Card className="shadow-xl border-t-4 border-indigo-600 mb-8 rounded-xl">
          <CardHeader>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              {quiz?.title}
            </h1>
          </CardHeader>
          <CardBody className="pt-0">
            <p className="text-lg text-gray-600 border-b pb-4 mb-4">
              {quiz?.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Chip
                size="md"
                variant="faded"
                startContent={<LayoutList className="w-4 h-4" />}
              >
                Total Questions:{" "}
                <span className="font-semibold ml-1">
                  {quiz?.questionCount}
                </span>
              </Chip>
              <LearnerProfileChip
                learnerProfile={quiz?.learnerProfile ?? null}
                size="md"
                variant="faded"
                color="default"
                startContent={<Users className="w-4 h-4" />}
              >
                Target Profile:{" "}
                <span className="font-semibold ml-1">
                  {quiz?.learnerProfile?.label}
                </span>
              </LearnerProfileChip>
            </div>
          </CardBody>
        </Card>
      )}

      {isFetching || !quiz || !correctQuiz ? (
        <QuestionSkeleton />
      ) : (
        state === "Take" 
        ? <QuizPage 
          quiz={quiz} 
          questionIndex={questionIndex}
          setQuestionIndex={setQuestionIndex}
          handleCorrectAnswerChange={handleCorrectAnswerChange} 
          complete={completeQuiz} />
        : <QuizReview quiz={quiz} correctQuiz={correctQuiz} score={getScore} restart={startQuiz} />
      )}
    </div>
  );
}
