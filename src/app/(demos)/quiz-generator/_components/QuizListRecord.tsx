"use client";

import { Button, Chip } from "@heroui/react";
import { CircleQuestionMark, Eye, ListTodo } from "lucide-react";
import { useRouter } from "next/navigation";
import { Quiz } from "../_models";
import { LearnerProfileChip } from "@/lib/learner-profiles";

interface QuizListRecordProps {
  record: Quiz;
}

export default function QuizListRecord({ record }: QuizListRecordProps) {
  const router = useRouter();

  const gotoView = (id: string) => {
    router.push(`/quiz-generator/${id}`);
  };

  return (
    <>
      {/* Content: Use a plain div for the grid layout */}
      <div className="w-full">
        <div className="col-span-3">
          <h2
            data-testid="quiz-list-record-title"
            className="text-2xl font-semibold"
          >
            {record.title}
          </h2>
          <p
            data-testid="quiz-list-record-description"
            className="text-sm text-gray-600 mb-4 text-justify line-clamp-2"
          >
            {record.description}
          </p>

          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
              <LearnerProfileChip
                data-testid="quiz-list-learner-chip"
                learnerProfile={record.learnerProfile}
                color="default"
                variant="faded"
              />
              <Chip
                data-testid="quiz-list-total-questions"
                variant="faded"
                color="default"
                startContent={<CircleQuestionMark size={18} />}
              >
                {record.questionCount} question
                {record.questionCount === 1 ? "" : "s"}
              </Chip>
            </div>
            {/* Take Button */}
            <Button
              data-testid="quiz-list-button-take"
              color="primary"
              startContent={<ListTodo />}
              onPress={() => gotoView(record.id)}
            >
              Take Quiz
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
