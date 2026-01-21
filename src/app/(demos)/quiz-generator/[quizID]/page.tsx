"use client";

import { Users, LayoutList } from "lucide-react";
import { Chip, Card, CardHeader, CardBody, addToast } from "@heroui/react";
import { LearnerProfileChip } from "@/lib/learner-profiles";
import { useDeleteQuiz } from "../_store";
import { useParams, useRouter } from "next/navigation";
import QuizOverviewSkeleton from "./_components/QuizSkeleton";
import QuestionSkeleton from "./_components/QuestionSkeleton";
import DemoNavigationPanel from "../../_components/DemoNavigationPanel";
import { useTakeQuiz } from "./_hooks/useTakeQuiz";
import QuizPage from "./_components/QuizPage";
import { useState } from "react";
import QuizReview from "./_components/QuizReview";

export default function QuizTeacherView() {
  const router = useRouter();
  const { quizID: id } = useParams<{ quizID: string }>();

  // Logic from Main (Taking the quiz)
  const {
    quiz,
    correctQuiz,
    isFetching,
    error,
    handleCorrectAnswerChange,
    getScore,
  } = useTakeQuiz(id);
  const [state, setState] = useState<"Take" | "Review">("Take");
  const [questionIndex, setQuestionIndex] = useState(0);

  // Logic from HEAD (Deleting the quiz)
  const { mutateAsync: deleteQuiz, isPending: isDeleting } = useDeleteQuiz();

  const startQuiz = () => setState("Take");
  const completeQuiz = () => setState("Review");

  if (error) {
    return (
      <div className="p-8 max-w-5xl mx-auto text-center text-red-600">
        <p>Error loading quiz: {error.message}</p>
      </div>
    );
  }

  const handleDelete = async () => {
    // Check if mutation is running
    if (isDeleting || !quiz) return;

    // Call the mutation hook with the record ID
    deleteQuiz(quiz.id, {
      onSuccess: () => {
        // Show success notification
        addToast({
          title: <p className="text-xl font-bold">Deleted!</p>,
          description: (
            <p>
              Quiz <span className="font-bold">{quiz.title}</span> has been
              removed.
            </p>
          ),
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        router.push("/quiz-generator");
      },
      onError: (error) => {
        addToast({
          title: <p className="text-xl font-bold">Error</p>,
          description: `Failed to delete quiz: ${error.message}`,
          color: "danger",
          shouldShowTimeoutProgress: true,
        });
      },
    });
  };

  const navProps = {
    backRoute: "/quiz-generator",
    editRoute: quiz ? `/quiz-generator/${quiz.id}/edit` : undefined,
    delete: quiz
      ? {
          onDelete: handleDelete,
          recordTitle: quiz?.title ?? "Unknown Quiz",
          recordType: "Quiz",
        }
      : undefined,
  };

  return (
    <>
      <DemoNavigationPanel {...navProps} />
      <div className="max-w-5xl mx-auto font-inter min-h-screen w-full">
        {isFetching || !quiz ? (
          <QuizOverviewSkeleton />
        ) : (
          <Card className="shadow-xl border-t-4 border-indigo-600 mb-8 rounded-xl">
            <CardHeader>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                {quiz.title}
              </h1>
            </CardHeader>
            <CardBody className="pt-0">
              <p className="text-lg text-gray-600 border-b pb-4 mb-4">
                {quiz.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Chip
                  size="md"
                  variant="faded"
                  startContent={<LayoutList className="w-4 h-4" />}
                >
                  Total Questions:{" "}
                  <span className="font-semibold ml-1">
                    {quiz.questionCount}
                  </span>
                </Chip>
                <LearnerProfileChip
                  learnerProfile={quiz.learnerProfile ?? null}
                  size="md"
                  variant="faded"
                  color="default"
                  startContent={<Users className="w-4 h-4" />}
                >
                  Target Profile:{" "}
                  <span className="font-semibold ml-1">
                    {quiz.learnerProfile?.label}
                  </span>
                </LearnerProfileChip>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Quiz Interaction Area */}
        {isFetching || !quiz || !correctQuiz ? (
          <QuestionSkeleton />
        ) : state === "Take" ? (
          <QuizPage
            quiz={quiz}
            questionIndex={questionIndex}
            setQuestionIndex={setQuestionIndex}
            handleCorrectAnswerChange={handleCorrectAnswerChange}
            complete={completeQuiz}
          />
        ) : (
          <QuizReview
            quiz={quiz}
            correctQuiz={correctQuiz}
            score={getScore}
            restart={startQuiz}
          />
        )}
      </div>
    </>
  );
}
