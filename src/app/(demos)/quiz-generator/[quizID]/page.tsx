"use client";

import React from "react";
import {
  Users,
  LayoutList,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Chip,
  Card,
  CardHeader,
  CardBody,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import { LearnerProfileChip } from "@/lib/learner-profiles";
import { useQuiz } from "../_store";
import { useParams } from "next/navigation";
import QuizOverviewSkeleton from "./_components/QuizSkeleton";
import QuestionSkeleton from "./_components/QuestionSkeleton";
import AnswerView from "./_components/Answer";

export default function CourseOutlineTeacherView() {
  const { quizID: id } = useParams<{ quizID: string }>();
  const { data: quiz, isFetching, error } = useQuiz(id);

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
                Total Lessons:{" "}
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

      {/* Detailed Lesson Breakdown */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Questions
      </h2>

      {isFetching ? (
        <QuestionSkeleton />
      ) : (
        <Accordion
          selectionMode="multiple"
          className="space-y-4"
          variant="splitted"
          defaultExpandedKeys={["0"]}
        >
          {quiz
            ? quiz.questions.map((question, index) => (
                <AccordionItem
                  key={index.toString()}
                  aria-label={question.question}
                  title={
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xl font-bold text-gray-800">
                        {question.question}
                      </span>
                    </div>
                  }
                  indicator={({ isOpen }) =>
                    isOpen ? (
                      <ChevronUp className="w-5 h-5 text-indigo-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )
                  }
                  classNames={{
                    trigger: "py-5 cursor-pointer",
                    heading: "text-xl",
                    content: "p-4 pt-0",
                    title: "text-lg font-semibold",
                    subtitle: "text-xs",
                    base: "border-t-4 border-indigo-200",
                  }}
                >
                    {question.answers.map((answer, i) => <AnswerView key={i} answer={answer} />)}
                </AccordionItem>
              ))
            : null}
        </Accordion>
      )}
    </div>
  );
}
