"use client";

import { ChangeEvent } from "react";
import { Users, LayoutList } from "lucide-react";
import {
  Chip,
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Textarea,
  addToast,
  Form,
} from "@heroui/react";
import QuizSkeleton from "../_components/QuizSkeleton";
import QuestionSkeleton from "../_components/QuestionSkeleton";
import { LearnerProfileChip } from "@/lib/learner-profiles";
import { useEditQuiz } from "../_hooks/useEditQuiz";
import { useParams, useRouter } from "next/navigation";
import EditableQuestion from "./_components/EditableQuestion";

export default function QuizEditView() {
  const router = useRouter();
  const { quizID: id } = useParams<{ quizID: string }>();

  const {
    cancelChanges,
    quiz,
    error,
    handleQuestionChange,
    handleAnswerChange,
    handleCorrectAnswerChange,
    handleTopLevelChange,
    isFetching,
    isModified,
    isPending,
    saveChanges,
  } = useEditQuiz(id);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    saveChanges().then((text) => {
      addToast({
        title: <p className="text-xl text-bold">Success!</p>,
        description: text,
        color: "success",
        shouldShowTimeoutProgress: true,
      });
      router.push(`/quiz-generator/${id}`);
    }).catch((errorText) => {
      addToast({
        title: <p className="text-xl text-bold">Error!</p>,
        description: errorText,
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    })
  }

  // --- Conditional Rendering ---

  if (error) {
    return (
      <div className="p-8 max-w-5xl mx-auto text-center text-red-600">
        <p>Error loading quiz: {error.message}</p>
      </div>
    );
  }

  const isFetchingData: boolean = isFetching && !isPending;

  // --- MAIN RENDER ---
  return (
    <div className="max-w-5xl mx-auto font-inter min-h-screen w-full">
      <Form className="w-full min-w-full max-w-full" data-testid="quiz-edit-form" onSubmit={save}>
        {isFetchingData && !quiz?.title ? (
          <QuizSkeleton />
        ) : (
          <Card className="w-full shadow-xl border-t-4 border-indigo-600 mb-8 rounded-xl">
            <CardHeader className="flex flex-col items-start w-full">
              {/* Editable Title - using HeroUI Input */}
              <Input
                isRequired
                label="Quiz Title"
                labelPlacement="outside"
                fullWidth
                size="lg"
                className="text-3xl font-extrabold"
                classNames={{
                  input: "text-3xl font-extrabold text-gray-900 leading-tight",
                }}
                value={quiz?.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleTopLevelChange("title", e.target.value)
                }
              />
            </CardHeader>
            <CardBody className="pt-0">
              {/* Editable Description - using HeroUI Textarea */}
              <Textarea
                isRequired
                label="Quiz Description"
                labelPlacement="outside"
                fullWidth
                rows={3}
                className="w-full text-lg text-gray-600"
                value={quiz?.description}
                onChange={(e: ChangeEvent<HTMLElement>) =>
                  handleTopLevelChange(
                    "description",
                    (e.target as HTMLTextAreaElement).value
                  )
                }
              />

              <div className="flex flex-wrap gap-4 mt-4">
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

        {/* Quiz Questions */}
        <h2 className="w-full text-2xl font-bold text-gray-800 mb-6">
          Questions
        </h2>

      {isFetchingData ? (
        <QuestionSkeleton />
      ) : (
        <div className="w-full space-y-6">
          {quiz?.questions.map((question, index) =>
            <EditableQuestion
              question={question}
              handleQuestionChange={handleQuestionChange(index)}
              handleAnswerChange={handleAnswerChange(index)}
              handleCorrectAnswerChange={handleCorrectAnswerChange(index)}
              key={index}
            />
          )}
        </div>
      )}

        {/* Save / Cancel Button Bar */}
        <div className="w-full flex justify-end gap-3 mt-8 p-4 bg-white rounded-xl shadow-lg sticky bottom-4 z-10">
          <Button
            type="reset"
            color="danger"
            variant="light"
            onPress={cancelChanges}
            isDisabled={!isModified || isPending}
            data-testid="quiz-edit-cancel"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            isDisabled={isPending}
            data-testid="quiz-edit-save"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
